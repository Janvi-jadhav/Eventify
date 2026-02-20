import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, authService } from '../services/supabase'

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  })

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      
      // Get current auth user
      const authUser = await authService.getCurrentUser()
      
      if (!authUser) {
        console.log('No auth user found, redirecting to login')
        navigate('/page1')
        return
      }

      // Get user profile from users table
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', authUser.id)
        .single()

      if (error) {
        console.error('Error fetching user data:', error)
        // If user not found in table, create a basic profile
        setUser({
          id: authUser.id,
          auth_id: authUser.id,
          full_name: authUser.user_metadata?.full_name || 'User',
          email: authUser.email
        })
        setFormData({
          fullName: authUser.user_metadata?.full_name || 'User',
          email: authUser.email || '',
        })
      } else {
        setUser(userData)
        setFormData({
          fullName: userData.full_name || '',
          email: userData.email || '',
        })
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      setMessage({ type: 'error', text: 'Failed to load profile. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image must be smaller than 5MB' })
        return
      }

      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadProfileImage = async () => {
    if (!profileImage || !user) return

    try {
      const fileExt = profileImage.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Upload to Supabase storage
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, profileImage)

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      // Update user record with avatar URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id)

      if (updateError) {
        throw updateError
      }

      setUser({ ...user, avatar_url: publicUrl })
      setProfileImage(null)
      setImagePreview(null)
      setMessage({ type: 'success', text: 'Profile picture updated successfully!' })
    } catch (error) {
      console.error('Error uploading image:', error)
      setMessage({ type: 'error', text: error.message || 'Failed to upload image' })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    // Validation
    if (!formData.fullName.trim()) {
      setMessage({ type: 'error', text: 'Full name is required' })
      return
    }

    setUpdating(true)

    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.fullName,
          updated_at: new Date(),
        })
        .eq('id', user.id)

      if (error) {
        throw error
      }

      setUser({ ...user, full_name: formData.fullName })
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setEditMode(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' })
    } finally {
      setUpdating(false)
    }
  }

  const handleSignOut = async () => {
    try {
      const result = await authService.signOut()
      if (result.success) {
        navigate('/page1')
      } else {
        setMessage({ type: 'error', text: result.error })
      }
    } catch (error) {
      console.error('Error signing out:', error)
      setMessage({ type: 'error', text: 'Failed to sign out' })
    }
  }

  if (loading) {
    return (
      <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-primary animate-spin">
            hourglass
          </span>
          <p className="text-slate-600 dark:text-slate-400 mt-4">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
        <p className="text-slate-600 dark:text-slate-400">User not found</p>
      </div>
    )
  }

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen relative overflow-x-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 animated-mesh opacity-30 dark:opacity-20"></div>
      
      {/* Floating Abstract Shapes */}
      <div className="fixed top-10 left-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 floating" style={{animationDelay: '0s'}}></div>
      <div className="fixed bottom-10 right-10 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 floating" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <header className="flex items-center justify-between px-6 py-6 lg:px-20 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/page2')}
              className="flex items-center gap-2 text-slate-900 dark:text-slate-100 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="font-extrabold">Back to Home</span>
            </button>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-extrabold">My Profile</h2>
          <div className="w-10"></div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-2xl">
            <div className="glass-card rounded-xl p-8 lg:p-12">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center mb-10">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    {user.avatar_url ? (
                      <img 
                        src={user.avatar_url} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-white text-6xl">person</span>
                    )}
                  </div>
                  {imagePreview && (
                    <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary shadow-2xl">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-white rounded-full p-3 cursor-pointer shadow-lg transition-colors">
                    <span className="material-symbols-outlined">camera_alt</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {(profileImage || imagePreview) && (
                  <button
                    onClick={uploadProfileImage}
                    className="mt-4 bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-full transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined">upload</span>
                    Upload Photo
                  </button>
                )}
              </div>

              {/* Message Display */}
              {message.text && (
                <div className={`p-4 rounded-full text-center text-sm font-semibold mb-8 ${
                  message.type === 'error' 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300' 
                    : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300'
                }`}>
                  {message.text}
                </div>
              )}

              {/* Profile Info Section */}
              <div className="space-y-6">
                {!editMode ? (
                  <>
                    {/* View Mode */}
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Full Name</label>
                        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-2">{user.full_name}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Email</label>
                        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-2">{user.email}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Member Since</label>
                        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-2">
                          {new Date(user.created_at).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={() => setEditMode(true)}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-full transition-colors flex items-center justify-center gap-2 group"
                      >
                        <span className="material-symbols-outlined">edit</span>
                        Edit Profile
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Edit Mode */}
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                        <div className="relative group">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">person</span>
                          <input 
                            className="w-full pl-14 pr-4 py-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email (Read-only)</label>
                        <div className="relative group">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors">mail</span>
                          <input 
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/50 focus:outline-none cursor-not-allowed transition-all" 
                            type="email"
                            value={formData.email}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="submit"
                          disabled={updating}
                          className="flex-1 bg-primary hover:bg-primary/90 disabled:bg-primary/60 text-white font-bold py-3 rounded-full transition-colors flex items-center justify-center gap-2"
                        >
                          {updating ? (
                            <>
                              <span className="inline-block animate-spin">
                                <span className="material-symbols-outlined">hourglass</span>
                              </span>
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined">save</span>
                              <span>Save Changes</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditMode(false)
                            setFormData({
                              fullName: user.full_name || '',
                              email: user.email || '',
                            })
                          }}
                          className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 font-bold py-3 rounded-full transition-colors flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined">close</span>
                          <span>Cancel</span>
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="w-full mt-10 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-full transition-colors flex items-center justify-center gap-2 group"
              >
                <span className="material-symbols-outlined">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-8 text-center text-slate-400 text-xs border-t border-slate-200 dark:border-slate-700">
          <p>© 2024 Eventify. Built for students, by students.</p>
        </footer>
      </div>
    </div>
  )
}
