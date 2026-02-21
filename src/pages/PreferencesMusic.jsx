import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PreferencesMusic() {
  const navigate = useNavigate()
  const [selectedGenres, setSelectedGenres] = useState([])

  const musicGenres = [
    'Rock', 'Pop', 'Hip-Hop', 'Jazz', 'Classical', 'Electronic',
    'Country', 'R&B', 'Indie', 'Metal', 'Blues', 'Folk'
  ]

  const toggleGenre = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  const handleSave = () => {
    localStorage.setItem('musicPreferences', JSON.stringify(selectedGenres))
    navigate('/page2')
  }

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
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Eventify</h2>
            </div>
            <button
              onClick={() => navigate('/page2')}
              className="text-slate-600 dark:text-slate-400 hover:text-primary font-medium transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 shadow-lg border border-slate-100 dark:border-slate-700">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <span className="material-symbols-outlined text-2xl text-primary">music_note</span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">Music Preferences</h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Select your favorite music genres to personalize your event feed</p>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Music Genres</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {musicGenres.map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`p-4 rounded-lg font-bold transition-all ${
                    selectedGenres.includes(genre)
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:border-primary border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 px-8 py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition-all disabled:opacity-50"
              disabled={selectedGenres.length === 0}
            >
              Save Preferences
            </button>
            <button
              onClick={() => navigate('/page2')}
              className="px-8 py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-900 dark:text-slate-100 font-bold rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
