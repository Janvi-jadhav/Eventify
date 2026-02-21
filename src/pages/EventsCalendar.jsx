import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../services/adminService'

export default function EventsCalendar() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [eventType, setEventType] = useState('all') // 'all', 'online', 'offline'

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const result = await adminService.getAllEvents()
      if (result.success) {
        const eventsWithMeet = result.data.map(event => ({
          ...event,
          is_online: event.location?.toLowerCase().includes('online') || event.location?.toLowerCase().includes('virtual'),
          gmeet_link: event.gmeet_link || generateGoogleMeetLink(event.id, event.title)
        }))
        setEvents(eventsWithMeet)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateGoogleMeetLink = (eventId, eventTitle) => {
    // Generate a consistent Google Meet link based on event ID
    const meetCode = `eventify-${eventId}-${eventTitle.toLowerCase().replace(/\s+/g, '-')}`
    return `https://meet.google.com/${meetCode.slice(0, 15)}`
  }

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const filteredEvents = eventType === 'all' 
    ? events 
    : eventType === 'online' 
      ? events.filter(e => e.is_online)
      : events.filter(e => !e.is_online)

  const monthEvents = filteredEvents.filter(event => {
    const eventDate = new Date(event.event_date)
    return eventDate.getMonth() === currentMonth.getMonth() && 
           eventDate.getFullYear() === currentMonth.getFullYear()
  })

  const calendarDays = []
  const firstDay = getFirstDayOfMonth(currentMonth)
  const daysInMonth = getDaysInMonth(currentMonth)

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/page2')}>
              <div className="bg-primary p-2 rounded-xl text-white">
                <span className="material-symbols-outlined">event</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Eventify Calendar</h2>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date())}
                    className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-bold text-slate-600 dark:text-slate-400 text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, idx) => {
                  const dayEvents = day ? filteredEvents.filter(e => {
                    const eDate = new Date(e.event_date)
                    return eDate.getDate() === day && 
                           eDate.getMonth() === currentMonth.getMonth()
                  }) : []

                  return (
                    <div
                      key={idx}
                      className={`min-h-24 p-2 rounded-lg border-2 transition-all cursor-pointer ${
                        day
                          ? 'border-slate-200 dark:border-slate-600 hover:border-primary bg-slate-50 dark:bg-slate-700'
                          : 'border-transparent'
                      }`}
                    >
                      {day && (
                        <>
                          <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">{day}</div>
                          {dayEvents.length > 0 && (
                            <div className="space-y-1">
                              {dayEvents.slice(0, 2).map(event => (
                                <div
                                  key={event.id}
                                  onClick={() => setSelectedEvent(event)}
                                  className="text-xs bg-primary/20 text-primary rounded p-1 truncate hover:bg-primary/30 transition-colors"
                                >
                                  {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-slate-500 font-bold">
                                  +{dayEvents.length - 2} more
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sidebar: Event Filters & Selected Event */}
          <div className="space-y-6">
            {/* Filter */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Filter Events</h3>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All Events' },
                  { value: 'online', label: 'Online Events' },
                  { value: 'offline', label: 'In-Person Events' }
                ].map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setEventType(filter.value)}
                    className={`w-full p-3 rounded-lg font-bold transition-all text-left ${
                      eventType === filter.value
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:border-primary border border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Event Details */}
            {selectedEvent && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{selectedEvent.title}</h3>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-lg">calendar_today</span>
                    {new Date(selectedEvent.event_date).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                    {selectedEvent.location}
                  </div>

                  {selectedEvent.description && (
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-600">
                      <p className="text-slate-700 dark:text-slate-300">{selectedEvent.description}</p>
                    </div>
                  )}

                  {selectedEvent.is_online && (
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-600">
                      <a
                        href={selectedEvent.gmeet_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition-all"
                      >
                        <span className="material-symbols-outlined">video_call</span>
                        Join Google Meet
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Upcoming Events Summary */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                Upcoming ({monthEvents.length})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <span className="material-symbols-outlined animate-spin text-primary text-3xl">hourglass</span>
                  </div>
                ) : monthEvents.length > 0 ? (
                  monthEvents.map(event => (
                    <button
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className={`w-full p-3 rounded-lg transition-all text-left ${
                        selectedEvent?.id === event.id
                          ? 'bg-primary text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      <div className="font-bold text-sm mb-1">{event.title}</div>
                      <div className="text-xs opacity-75">
                        {new Date(event.event_date).toLocaleDateString()}
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 text-sm">No events this month</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
