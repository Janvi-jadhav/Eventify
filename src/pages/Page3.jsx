import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../services/adminService'

export default function Page3() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState({})
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const result = await adminService.getAllEvents()
      if (result.success) {
        setEvents(result.data || [])
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', 'Tech', 'Music', 'Arts', 'Sports', 'Food', 'Business', 'Education']
  const eventTypes = [
    { value: 'all', label: 'All Events' },
    { value: 'online', label: 'Online Events' },
    { value: 'offline', label: 'In-Person Events' }
  ]

  const isOnlineEvent = (location) => {
    return location?.toLowerCase().includes('online') || location?.toLowerCase().includes('virtual') || location?.toLowerCase().includes('zoom')
  }

  const filteredEvents = events.filter(event => {
    const categoryMatch = selectedCategory === 'all' || event.category?.toLowerCase() === selectedCategory.toLowerCase()
    const typeMatch = 
      selectedType === 'all' ||
      (selectedType === 'online' && isOnlineEvent(event.location)) ||
      (selectedType === 'offline' && !isOnlineEvent(event.location))
    return categoryMatch && typeMatch
  })

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav border-b border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/page2')}>
              <div className="bg-primary p-2 rounded-xl text-white">
                <span className="material-symbols-outlined block">event</span>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Eventify</h2>
            </div>
            <nav className="hidden lg:flex items-center gap-10">
              <button className="text-slate-600 dark:text-slate-400 hover:text-primary font-medium text-sm transition-colors" onClick={() => navigate('/page2')}>Home</button>
              <button className="text-primary font-bold text-sm">Discover</button>
            </nav>
            <button 
              onClick={() => navigate('/profile')}
              className="h-10 w-10 rounded-full border-2 border-primary/20 overflow-hidden cursor-pointer hover:border-primary transition-colors"
            >
              <img 
                alt="Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqACGh36IahgiDO3igGO9ZiSuQt3gen8wq1eSviAuDZFTWyFO1KdjrKWlBr6tnaBTV97VFulY6kfXi0YO4KSCGPrhCIBuNNp3LIZQ29B0HSE7f3mol2WpQtZdaHUhn_gZ7_d_OiWm_T8Fq14yjLePGKcBmTiwxzlmWbV1ZG2EuMZssXGhBCptQcazuIugWuFhdKf-nCa6OZEtcS6KHrB9XSwnqHlIpJj20XKqTmWpRJNaWauYVdI7WIdabWxOxVlYqjvJFYtL-cVOZ"
              />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 mb-3 tracking-tight">
            Personalize Your Experience
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Filter events by category and type to find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category Filter */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">category</span>
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full p-3 rounded-lg text-left font-bold transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Event Type Filter */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">language</span>
                Event Type
              </h3>
              <div className="space-y-2">
                {eventTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`w-full p-3 rounded-lg text-left font-bold transition-all ${
                      selectedType === type.value
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-6 border border-primary/20">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Results
              </h3>
              <p className="text-3xl font-extrabold text-primary mb-2">{filteredEvents.length}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                events match your preferences
              </p>
            </div>
          </div>

          {/* Events Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <span className="material-symbols-outlined text-6xl text-primary animate-spin">hourglass</span>
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map(event => (
                  <div
                    key={event.id}
                    className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 event-card-hover"
                  >
                    {/* Image */}
                    {event.image_url && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          {isOnlineEvent(event.location) && (
                            <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">video_call</span>
                              Online
                            </span>
                          )}
                          {event.category && (
                            <span className="bg-white/90 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                              {event.category}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => toggleFavorite(event.id)}
                          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full text-slate-400 hover:text-red-500 transition-all heart-pop"
                        >
                          <span
                            className="material-symbols-outlined text-xl"
                            style={{fontVariationSettings: favorites[event.id] ? "'FILL' 1" : "'FILL' 0"}}
                          >
                            favorite
                          </span>
                        </button>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-3">
                        <div className="text-primary font-bold text-sm uppercase tracking-tighter mb-2">
                          {new Date(event.event_date).toLocaleDateString()}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {event.title}
                        </h3>
                      </div>

                      {event.description && (
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                          {event.description}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mb-4">
                        <span className="material-symbols-outlined text-base">location_on</span>
                        <span className="truncate">{event.location || 'TBD'}</span>
                      </div>

                      {isOnlineEvent(event.location) && (
                        <a
                          href={`https://meet.google.com/${event.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 text-sm mb-3"
                        >
                          <span className="material-symbols-outlined text-lg">video_call</span>
                          Join Google Meet
                        </a>
                      )}

                      <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 hover:bg-primary hover:text-white text-slate-900 dark:text-slate-100 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                        View Details
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">event_note</span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">No Events Found</h3>
                <p className="text-slate-600 dark:text-slate-400">Try adjusting your filters to find more events</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-xs">
          © 2024 Eventify. All rights reserved. Discover your next adventure.
        </div>
      </footer>
    </div>
  )
}
