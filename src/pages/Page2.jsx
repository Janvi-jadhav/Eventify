import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Page2() {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState({})

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const events = [
    {
      id: 1,
      title: 'Summer Beats 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcYRFdtytNu6JYucI8HLbIVapThG0XJQrEx0kRX2rnSocVXCK0SnqriPwZsEiucXcGZuEzqvIvGDcZ9iijzY_Q95GZDh-XFJu1rp0J5lMM5oXZPppznQ2PydxEjQQFf-txkbA7MUV4k69TrrMWMTfinAsnT5lwz-l1h8akxsCcSWAyaDMOqLu0UJpwChNyKTdmSYSfjE7Hdt7R1Kwy7PMltHAq-eL9wdNWS4SPAtLyd-ikzCf4iEw4eQxjHp9ZbYO90amut_lxlcwR',
      date: 'July 15, 2024',
      location: 'Golden Gate Park, San Francisco',
      attending: '1.2k',
      category: 'Music',
      price: 'Free'
    },
    {
      id: 2,
      title: 'Innovate Tech Summit',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD18jV9pnF9Vua4_8vygJAcoiV5gXrwUYvpywy9cg0HW8qU1hTZJw4zHm-onBzq6BhuP6gBqnx6YYd-F7S9JNpToYUuWVppanx0AEZ9sraHXQRhauDvIq9gQiwT775ZwwQjyVI3rh95IFXzlBjhCLLISkcHE9xMSU8D28ueDb7AvshOQ9JZt6iMIE-DvblHaS7M_7elCj3mwtZD-3LbtUBPvZBJmioTCTHeIv7OiBbacUvRgNA2ftVzydqKU0Qver8dzQRJu7mTGK7c',
      date: 'Aug 10, 2024',
      location: 'Javits Center, New York City',
      attending: '4.5k',
      category: 'Tech',
      price: 'Paid'
    },
    {
      id: 3,
      title: 'Creative Canvas Night',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4jPTZEiIC5RzPdekwH-UjxCuxb9mONEOsSfABmakhp5G_eRDg1k8sLukQXgPIhT-8ubloZv0IvVc3_fN1OyjFfH2hQsTzojpJD4kGznRPQTExCoQa_o0xgkSedKo5olmRhIRQu26g0QwN4TlintVGgauwc2dIl5OyMAjQnkkgKTebpHi27s9HGyhIs8UunGsEAyEZUXGaNMXzJcMsA9ubP1JIMisINSA-rRVbGm6QWHZo-Bn5BH6XouIFyj1WXncYRp5qm78swSa-',
      date: 'Sept 05, 2024',
      location: 'Arts District, Austin',
      attending: '320',
      category: 'Arts',
      price: 'Paid'
    },
    {
      id: 4,
      title: 'Midnight Jazz Sessions',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVUbfU3PyZmUt9RW8phwlYd0FbiQkebppvf3DBL24BgvAKch81Tjez9HYje-RjYKEU4qlpccduk94uPILKvig8s1fXqUp1QlexngZ_TMtyr7vMqEUUI7WcAyY74pOGivLz0qtuSaqjSYS1w69sbgXldZgazF1pmgpZYA80ZAXmEAiNa-2ctn6R1KrwFUqXmiHxzhwEo8CfjOfuwnA4JLsuNE17VjK1fHGsXyB5nV9X3w9DiUJryL5IHzN3-KAXotYM6IDIL1mQUTZK',
      date: 'Oct 12, 2024',
      location: 'The Blue Note, Chicago',
      attending: '150',
      category: 'Live Music',
      price: 'Paid'
    }
  ]

  const recommendedEvents = [
    {
      id: 5,
      title: 'Mastering Pottery Workshop',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsyP1S7g8aeWuz6BaAMnpUEE3ZmyQhhGOxq31v_sTa1RjjFrmOQDNMOcvuP2y_ox7FgjKpotncGNlH0SHrDCxzOXvXAi8DzCj554D9jrCACElLnNBYjaF5KWNwGmMMjhVQwNvWpSXvB7oADAaCeIdEERUX3wZVG6hdMXxKDyI5bU0eIb6nemLU5c_r4ScpVg75n4ioAiNdD6t_h1YnrFc9k_lxvvvsetZNLATQzBcCgn5FwG_fTLFr6SPKazfbYhDeBAl7IQkS4z4u',
      dateTime: 'Tomorrow • 10:00 AM',
      description: 'Hands-on experience with master potters.',
      price: '$45.00'
    },
    {
      id: 6,
      title: 'Digital Nomad Mixer',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALVS41dinWcPGfyWkzRvp8e6Oh0Q0GLGaPgpJ2ggL2tW1eF-9xqEBuy9QnF2CuiyP_AimC0Qxmb-8QcHe8gX_U4EOYuJ9m1kd_SL81yBgwC8lse9OJCk9K-1OThonUlz6zhtp32LrCSmLWkz6--r0sEUvUe7Nf0ZZ83gYPrmtTBbp1JIz_udgu3ixTUNMZuP6xIHyV2_l-RkPpT-n2wADRqibLHkfIRONFqvwrH7aRwd5cvYRIbPCjGJcO9EFu_t8NPaylnjKSj6sv',
      dateTime: 'July 18 • 6:00 PM',
      description: 'Meet and connect with remote workers.',
      price: 'Free Entry'
    },
    {
      id: 7,
      title: 'AI & Ethics Seminar',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBNr38hqilcftmHPqvoCkhdYI4xMJyLmauu1Mvlx9SAu_FomXzA5gDvUZtZrXTNMeW5ZSjC-_sIPHuiYyG6VOXoqEqjt0WEoStn0fxvN5nzq-lFGjJaRbExKemXYX8vLdR9K_plNmYITtVsOWVLHG0fdIN4WxAo3DFjIUhVTzsKp_PWKM54603fNCiWEIjtZkd5XQwQqFNnIbRRNY6LCas8zI2TlOPhwTf6Ju6hD8zJi6aq4DEJ7t55dn8lgFH5o7Uc0iuAWVgdW1c',
      dateTime: 'July 20 • 2:00 PM',
      description: 'A deep dive into the future of intelligence.',
      price: '$15.00'
    }
  ]

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 glass-nav border-b border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Search */}
            <div className="flex items-center gap-8 flex-1">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                <div className="bg-primary p-2 rounded-xl text-white">
                  <span className="material-symbols-outlined block">event</span>
                </div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Eventify</h2>
              </div>
              <div className="hidden md:flex flex-1 max-w-md">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
                  </div>
                  <input 
                    className="block w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-slate-500" 
                    placeholder="Search concerts, workshops, festivals..." 
                    type="text"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-10 px-8">
              <a className="text-primary font-bold text-sm nav-active-pill" href="#home">Home</a>
              <button className="text-slate-600 dark:text-slate-400 hover:text-primary font-medium text-sm transition-colors" onClick={() => navigate('/calendar')}>Calendar</button>
              <button className="text-slate-600 dark:text-slate-400 hover:text-primary font-medium text-sm transition-colors" onClick={() => navigate('/page8')}>My Events</button>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/calendar')}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors relative"
                title="Calendar"
              >
                <span className="material-symbols-outlined text-2xl">calendar_today</span>
              </button>
              <button 
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors relative"
                title="Notifications"
              >
                <span className="material-symbols-outlined text-2xl">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className="h-10 w-10 rounded-full border-2 border-primary/20 overflow-hidden cursor-pointer hover:border-primary transition-colors"
                title="Profile"
              >
                <img 
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqACGh36IahgiDO3igGO9ZiSuQt3gen8wq1eSviAuDZFTWyFO1KdjrKWlBr6tnaBTV97VFulY6kfXi0YO4KSCGPrhCIBuNNp3LIZQ29B0HSE7f3mol2WpQtZdaHUhn_gZ7_d_OiWm_T8Fq14yjLePGKcBmTiwxzlmWbV1ZG2EuMZssXGhBCptQcazuIugWuFhdKf-nCa6OZEtcS6KHrB9XSwnqHlIpJj20XKqTmWpRJNaWauYVdI7WIdabWxOxVlYqjvJFYtL-cVOZ"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="relative rounded-xl overflow-hidden mb-12 min-h-[480px] flex items-center justify-center text-center p-8 bg-slate-900">
          <div className="absolute inset-0 opacity-60">
            <img 
              alt="Crowd at concert" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtpkZoGI5ePNAUNMYC5FdGYgvAjOlwRJXxdc3c7Vo8zSuO2TKuxx7aprpb082VHdRiLzQeIeCFqE668r1fgZ11uUpFNi1QbeUyuzZemId4nmRIaC9FLn9vgYJUTAhaibuTculCaSR-PuNLm4qm2R70_hlD6w7mg9B1CNQKkX8JSYC_EV2xyjMzIAM8KOi3a9lm6jbeTuDNN-32iLJVp8qByBG2wP3e5-C_37Nk5gLLj2adoX0dNHoPbWYR2iDbYMqTCG1LRF8DY2ZE"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block py-1 px-4 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
              Happening Now
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              Discover Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Adventure</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed font-medium">
              Tailor your experience to find the best events near you. From underground jazz to global tech summits.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/page3')}
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 text-lg"
              >
                Personalize Your Feed
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full backdrop-blur-md border border-white/20 transition-all text-lg">
                Explore Local Events
              </button>
            </div>
          </div>
        </section>

        {/* Trending Carousel Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Trending Events</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">What's hot in your city this week</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary text-slate-400 hover:text-primary transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary text-slate-400 hover:text-primary transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative mb-16">
          <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x">
            {events.map(event => (
              <div key={event.id} className="flex-none w-80 md:w-96 snap-start">
                <div className="group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 transition-all duration-300 event-card-hover">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      src={event.image}
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`${event.price === 'Free' ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-primary to-indigo-600'} text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider`}>
                        {event.price}
                      </span>
                      <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                        {event.category}
                      </span>
                    </div>
                    <button 
                      onClick={() => toggleFavorite(event.id)}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 transition-all heart-pop"
                    >
                      <span 
                        className="material-symbols-outlined block text-xl"
                        style={{fontVariationSettings: favorites[event.id] ? "'FILL' 1" : "'FILL' 0"}}
                      >
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-primary font-bold text-sm uppercase tracking-tighter">{event.date}</div>
                      <div className="flex items-center text-slate-400 text-xs gap-1">
                        <span className="material-symbols-outlined text-sm">group</span>
                        {event.attending} attending
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug group-hover:text-primary transition-colors">{event.title}</h3>
                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm gap-1 mb-6">
                      <span className="material-symbols-outlined text-base">location_on</span>
                      {event.location}
                    </div>
                    <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 hover:bg-primary hover:text-white text-slate-900 dark:text-slate-100 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                      View Details
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personalization CTA */}
        <section className="bg-white dark:bg-slate-800 rounded-xl p-10 border border-slate-100 dark:border-slate-700 shadow-sm mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full -ml-10 -mb-10"></div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">Personalize Your Experience</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium mb-8">Select your favorite categories and we'll build a personalized feed of events you'll love.</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <button 
                  onClick={() => navigate('/preferences-music')}
                  className="px-5 py-2.5 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all text-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">music_note</span>
                  Music
                </button>
                <button 
                  onClick={() => navigate('/preferences-tech')}
                  className="px-5 py-2.5 rounded-full border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-bold hover:border-primary hover:text-primary transition-all text-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">computer</span>
                  Tech
                </button>
                <button 
                  onClick={() => navigate('/preferences-arts')}
                  className="px-5 py-2.5 rounded-full border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-bold hover:border-primary hover:text-primary transition-all text-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">palette</span>
                  Arts
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">Recommended for You</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Based on your recent activity</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {recommendedEvents.map(event => (
            <div key={event.id} className="group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 transition-all duration-300 event-card-hover">
              <div className="relative h-48 overflow-hidden">
                <img 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src={event.image}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-tight">{event.dateTime}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">{event.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{event.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold">{event.price}</span>
                  <button 
                    onClick={() => toggleFavorite(event.id)}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500 transition-all heart-pop"
                  >
                    <span 
                      className="material-symbols-outlined text-xl"
                      style={{fontVariationSettings: favorites[event.id] ? "'FILL' 1" : "'FILL' 0"}}
                    >
                      favorite
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <span className="material-symbols-outlined block">event</span>
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-slate-100">Eventify</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
              <a className="hover:text-primary transition-colors" href="#about">About Us</a>
              <a className="hover:text-primary transition-colors" href="#help">Help Center</a>
              <a className="hover:text-primary transition-colors" href="#privacy">Privacy Policy</a>
              <a className="hover:text-primary transition-colors" href="#terms">Terms of Service</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-slate-400 text-xs">
            © 2024 Eventify. All rights reserved. Designed for your next adventure.
          </div>
        </div>
      </footer>
    </div>
  )
}
