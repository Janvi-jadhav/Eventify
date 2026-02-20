import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/supabase'
import { adminService } from '../services/adminService'

export default function Admin() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  // Dashboard state
  const [stats, setStats] = useState({ totalUsers: 0, totalEvents: 0 })

  // Users state
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)

  // Events state
  const [events, setEvents] = useState([])
  const [eventsLoading, setEventsLoading] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    category: '',
    image_url: ''
  })

  useEffect(() => {
    checkAdminAccess()
    loadDashboard()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const user = await authService.getCurrentUser()
      if (!user) {
        navigate('/')
        return
      }
      setLoading(false)
    } catch (error) {
      navigate('/')
    }
  }

  const loadDashboard = async () => {
    try {
      const result = await adminService.getStats()
      if (result.success) {
        setStats({
          totalUsers: result.totalUsers,
          totalEvents: result.totalEvents
        })
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  // ===== USERS MANAGEMENT =====
  const loadUsers = async () => {
    setUsersLoading(true)
    setMessage({ type: '', text: '' })
    try {
      const result = await adminService.getAllUsers()
      if (result.success) {
        setUsers(result.data)
      } else {
        setMessage({ type: 'error', text: result.error })
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setUsersLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      const result = await adminService.deleteUser(userId)
      if (result.success) {
        setUsers(users.filter(u => u.id !== userId))
        setMessage({ type: 'success', text: 'User deleted successfully' })
      } else {
        setMessage({ type: 'error', text: result.error })
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    }
  }

  // ===== EVENTS MANAGEMENT =====
  const loadEvents = async () => {
    setEventsLoading(true)
    setMessage({ type: '', text: '' })
    try {
      const result = await adminService.getAllEvents()
      if (result.success) {
        setEvents(result.data)
      } else {
        setMessage({ type: 'error', text: result.error })
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setEventsLoading(false)
    }
  }

  const handleEventFormChange = (e) => {
    const { name, value } = e.target
    setEventForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveEvent = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (!eventForm.title || !eventForm.event_date || !eventForm.location) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' })
      return
    }

    try {
      let result
      if (editingEvent) {
        result = await adminService.updateEvent(editingEvent.id, eventForm)
      } else {
        result = await adminService.createEvent({
          ...eventForm,
          created_at: new Date()
        })
      }

      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: editingEvent ? 'Event updated successfully' : 'Event created successfully' 
        })
        setShowEventForm(false)
        setEditingEvent(null)
        setEventForm({
          title: '',
          description: '',
          event_date: '',
          location: '',
          category: '',
          image_url: ''
        })
        loadEvents()
      } else {
        setMessage({ type: 'error', text: result.error })
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    }
  }

  const handleEditEvent = (event) => {
    setEventForm({
      title: event.title,
      description: event.description,
      event_date: event.event_date,
      location: event.location,
      category: event.category,
      image_url: event.image_url
    })
    setEditingEvent(event)
    setShowEventForm(true)
  }

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return

    try {
      const result = await adminService.deleteEvent(eventId)
      if (result.success) {
        setEvents(events.filter(e => e.id !== eventId))
        setMessage({ type: 'success', text: 'Event deleted successfully' })
      } else {
        setMessage({ type: 'error', text: result.error })
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    }
  }

  const handleSignOut = async () => {
    await authService.signOut()
    navigate('/page2')
  }

  if (loading) {
    return (
      <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
        <span className="material-symbols-outlined text-6xl text-primary animate-spin">
          hourglass
        </span>
      </div>
    )
  }

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/page2')}>
            <div className="bg-primary p-2 rounded-xl text-white">
              <span className="material-symbols-outlined">admin_panel_settings</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="flex gap-4 mb-10 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-4 px-4 font-bold transition-colors ${
              activeTab === 'dashboard'
                ? 'border-b-2 border-primary text-slate-900 dark:text-slate-100'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </span>
          </button>
          <button
            onClick={() => { setActiveTab('users'); loadUsers() }}
            className={`pb-4 px-4 font-bold transition-colors ${
              activeTab === 'users'
                ? 'border-b-2 border-primary text-slate-900 dark:text-slate-100'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined">people</span>
              Users
            </span>
          </button>
          <button
            onClick={() => { setActiveTab('events'); loadEvents() }}
            className={`pb-4 px-4 font-bold transition-colors ${
              activeTab === 'events'
                ? 'border-b-2 border-primary text-slate-900 dark:text-slate-100'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined">event</span>
              Events
            </span>
          </button>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`p-4 rounded-lg text-center text-sm font-semibold mb-8 ${
            message.type === 'error'
              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300'
              : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300'
          }`}>
            {message.text}
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">Total Users</p>
                  <h3 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">{stats.totalUsers}</h3>
                </div>
                <span className="material-symbols-outlined text-6xl text-blue-500 opacity-20">people</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">Total Events</p>
                  <h3 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">{stats.totalEvents}</h3>
                </div>
                <span className="material-symbols-outlined text-6xl text-primary opacity-20">event</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">System Status</p>
                  <h3 className="text-4xl font-extrabold text-green-500">Active</h3>
                </div>
                <span className="material-symbols-outlined text-6xl text-green-500 opacity-20">check_circle</span>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
            {usersLoading ? (
              <div className="p-8 text-center">
                <span className="material-symbols-outlined text-4xl text-primary animate-spin">
                  hourglass
                </span>
              </div>
            ) : users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-100 dark:bg-slate-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Joined</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100">{user.full_name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-500 hover:text-red-700 font-bold flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-600 dark:text-slate-400">
                No users found
              </div>
            )}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            {!showEventForm ? (
              <>
                <button
                  onClick={() => setShowEventForm(true)}
                  className="mb-6 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined">add</span>
                  Create New Event
                </button>

                {eventsLoading ? (
                  <div className="flex justify-center p-8">
                    <span className="material-symbols-outlined text-4xl text-primary animate-spin">
                      hourglass
                    </span>
                  </div>
                ) : events.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map(event => (
                      <div key={event.id} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg">
                        {event.image_url && (
                          <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover" />
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">{event.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{event.description}</p>
                          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                            <p>📍 {event.location}</p>
                            <p>📅 {new Date(event.event_date).toLocaleDateString()}</p>
                            <p>🏷️ {event.category}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditEvent(event)}
                              className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                              <span className="material-symbols-outlined">edit</span>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                              <span className="material-symbols-outlined">delete</span>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    No events found
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </h3>
                <form onSubmit={handleSaveEvent} className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={eventForm.title}
                      onChange={handleEventFormChange}
                      className="w-full mt-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</label>
                    <textarea
                      name="description"
                      value={eventForm.description}
                      onChange={handleEventFormChange}
                      rows="4"
                      className="w-full mt-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Date *</label>
                      <input
                        type="datetime-local"
                        name="event_date"
                        value={eventForm.event_date}
                        onChange={handleEventFormChange}
                        className="w-full mt-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={eventForm.category}
                        onChange={handleEventFormChange}
                        className="w-full mt-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={eventForm.location}
                      onChange={handleEventFormChange}
                      className="w-full mt-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Image URL</label>
                    <input
                      type="url"
                      name="image_url"
                      value={eventForm.image_url}
                      onChange={handleEventFormChange}
                      className="w-full mt-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">save</span>
                      Save Event
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowEventForm(false)
                        setEditingEvent(null)
                        setEventForm({
                          title: '',
                          description: '',
                          event_date: '',
                          location: '',
                          category: '',
                          image_url: ''
                        })
                      }}
                      className="flex-1 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 font-bold py-3 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
