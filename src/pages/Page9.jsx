import { useNavigate } from 'react-router-dom'

export default function Page9() {
  const navigate = useNavigate()

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen">
      <header className="sticky top-0 z-50 glass-nav border-b border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-primary p-2 rounded-xl text-white">
              <span className="material-symbols-outlined block">event</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Eventify</h2>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">Profile Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Add your profile page content here</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-all"
        >
          Back to Home
        </button>
      </main>
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-xs">
          © 2024 Eventify.
        </div>
      </footer>
    </div>
  )
}
