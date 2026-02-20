import { useNavigate } from 'react-router-dom'

export default function Page3() {
  const navigate = useNavigate()

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen">
      <header className="sticky top-0 z-50 glass-nav border-b border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-primary p-2 rounded-xl text-white">
                  <span className="material-symbols-outlined block">event</span>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Eventify</h2>
            </div>
            <nav className="hidden lg:flex items-center gap-10">
              <a className="text-slate-600 dark:text-slate-400 hover:text-primary font-medium text-sm transition-colors" onClick={() => navigate('/page2')}>Home</a>
              <a className="text-slate-600 dark:text-slate-400 hover:text-primary font-medium text-sm transition-colors" href="#explore">Explore</a>
            </nav>
            <button 
              onClick={() => navigate('/page9')}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-100 dark:border-slate-700">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">Personalize Your Experience</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
            This is page 3. Add your personalization content here.
          </p>
          <button 
            onClick={() => navigate('/page2')}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-all"
          >
            Back to Events
          </button>
        </div>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-xs">
          © 2024 Eventify. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
