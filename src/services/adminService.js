// Admin service functions for Supabase operations
import { supabase } from './supabase'

export const adminService = {
  // ===== USER MANAGEMENT =====
  getAllUsers: async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { success: true, data, error: null }
    } catch (error) {
      return { success: false, data: null, error: error.message }
    }
  },

  deleteUser: async (userId) => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId)

      if (error) throw error
      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // ===== EVENT MANAGEMENT =====
  getAllEvents: async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false })

      if (error) throw error
      return { success: true, data, error: null }
    } catch (error) {
      return { success: false, data: null, error: error.message }
    }
  },

  createEvent: async (eventData) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()

      if (error) throw error
      return { success: true, data, error: null }
    } catch (error) {
      return { success: false, data: null, error: error.message }
    }
  },

  updateEvent: async (eventId, eventData) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', eventId)
        .select()

      if (error) throw error
      return { success: true, data, error: null }
    } catch (error) {
      return { success: false, data: null, error: error.message }
    }
  },

  deleteEvent: async (eventId) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId)

      if (error) throw error
      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // ===== STATISTICS =====
  getStats: async () => {
    try {
      const [usersRes, eventsRes] = await Promise.all([
        supabase.from('users').select('id'),
        supabase.from('events').select('id'),
      ])

      return {
        success: true,
        totalUsers: usersRes.data?.length || 0,
        totalEvents: eventsRes.data?.length || 0,
        error: null
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
