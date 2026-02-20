import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Environment Variables:')
console.log('VITE_SUPABASE_URL:', supabaseUrl)
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Loaded' : 'Missing')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please check your .env.local file.')
  console.error('Expected:')
  console.error('  VITE_SUPABASE_URL=https://your-project.supabase.co')
  console.error('  VITE_SUPABASE_ANON_KEY=your-anon-key')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

// Auth functions
export const authService = {
  signUp: async (email, password, fullName) => {
    try {
      // Sign up user with auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) {
        return { success: false, error: authError.message, data: null }
      }

      // Create user record in users table
      if (authData.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .insert([
            {
              auth_id: authData.user.id,
              email: email,
              full_name: fullName,
            },
          ])
          .select()

        if (userError) {
          // Delete the auth user if profile creation failed
          await supabase.auth.admin.deleteUser(authData.user.id)
          return { success: false, error: 'Failed to create user profile', data: null }
        }

        return { success: true, error: null, data: userData }
      }

      return { success: false, error: 'Authentication failed', data: null }
    } catch (error) {
      return { success: false, error: error.message, data: null }
    }
  },

  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, error: error.message, data: null }
      }

      return { success: true, error: null, data }
    } catch (error) {
      return { success: false, error: error.message, data: null }
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        return { success: false, error: error.message }
      }
      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  getCurrentUser: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    } catch (error) {
      return null
    }
  },
}
