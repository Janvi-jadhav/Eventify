import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { authService } from '../services/supabase'

export default function Page1() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('login')
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginMessage, setLoginMessage] = useState({ type: '', text: '' })

  const handleLoginInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setLoginMessage({ type: '', text: '' })

    // Validation
    if (!loginData.email.trim()) {
      setLoginMessage({ type: 'error', text: 'Please enter your email' })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      setLoginMessage({ type: 'error', text: 'Please enter a valid email' })
      return
    }
    if (!loginData.password) {
      setLoginMessage({ type: 'error', text: 'Please enter your password' })
      return
    }

    setLoginLoading(true)

    try {
      // Call Supabase signin
      const result = await authService.signIn(loginData.email, loginData.password)

      if (result.success) {
        setLoginMessage({ type: 'success', text: 'Login successful! Redirecting...' })
        setTimeout(() => {
          navigate('/page2')
        }, 1000)
      } else {
        setLoginMessage({ type: 'error', text: result.error || 'Invalid email or password' })
      }
    } catch (error) {
      setLoginMessage({ type: 'error', text: error.message || 'Login failed. Please try again.' })
    } finally {
      setLoginLoading(false)
    }
  }
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false
  })
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupMessage, setSignupMessage] = useState({ type: '', text: '' })

  const handleSignupInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setSignupData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    setSignupMessage({ type: '', text: '' })

    // Validation
    if (!signupData.fullName.trim()) {
      setSignupMessage({ type: 'error', text: 'Please enter your full name' })
      return
    }
    if (!signupData.email.trim()) {
      setSignupMessage({ type: 'error', text: 'Please enter your email' })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      setSignupMessage({ type: 'error', text: 'Please enter a valid email' })
      return
    }
    if (!signupData.password) {
      setSignupMessage({ type: 'error', text: 'Please enter a password' })
      return
    }
    if (signupData.password.length < 6) {
      setSignupMessage({ type: 'error', text: 'Password must be at least 6 characters' })
      return
    }
    if (signupData.password !== signupData.confirmPassword) {
      setSignupMessage({ type: 'error', text: 'Passwords do not match' })
      return
    }
    if (!signupData.agree) {
      setSignupMessage({ type: 'error', text: 'Please agree to Terms & Conditions' })
      return
    }

    setSignupLoading(true)
    
    try {
      // Call Supabase signup
      const result = await authService.signUp(
        signupData.email,
        signupData.password,
        signupData.fullName
      )

      if (result.success) {
        setSignupMessage({ type: 'success', text: 'Account created successfully! Check your email to verify.' })
        setTimeout(() => {
          setSignupData({ fullName: '', email: '', password: '', confirmPassword: '', agree: false })
          setSignupMessage({ type: '', text: '' })
          setActiveTab('login')
        }, 2000)
      } else {
        setSignupMessage({ type: 'error', text: result.error || 'Failed to create account. Please try again.' })
      }
    } catch (error) {
      setSignupMessage({ type: 'error', text: error.message || 'Failed to create account. Please try again.' })
    } finally {
      setSignupLoading(false)
    }
  }

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen relative overflow-x-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 animated-mesh opacity-30 dark:opacity-20"></div>
      
      {/* Floating Abstract Shapes */}
      <div className="fixed top-10 left-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 floating" style={{animationDelay: '0s'}}></div>
      <div className="fixed bottom-10 right-10 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 floating" style={{animationDelay: '2s'}}></div>
      <div className="fixed top-1/2 left-1/3 w-48 h-48 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 floating" style={{animationDelay: '4s'}}></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <header className="flex items-center justify-between px-6 py-6 lg:px-20">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined">event</span>
            </div>
            <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-extrabold tracking-tight">Eventify</h2>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a className="text-slate-600 dark:text-slate-400 font-medium hover:text-primary transition-colors" href="#how-it-works">How it works</a>
            <a className="text-slate-600 dark:text-slate-400 font-medium hover:text-primary transition-colors" href="#campus-hub">Campus Hub</a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text & Image */}
            <div className="hidden lg:flex flex-col items-start gap-8">
              <div className="space-y-4">
                <h1 className="text-slate-900 dark:text-slate-100 text-5xl font-extrabold leading-[1.1]">
                  Your next <span className="text-primary">campus adventure</span> starts here.
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md">
                  Join thousands of students discovering exclusive workshops, parties, and networking events.
                </p>
              </div>

              <div className="relative w-full aspect-square max-w-md">
                <div className="absolute inset-0 bg-primary/10 rounded-xl transform -rotate-3"></div>
                <img 
                  alt="Students laughing and using technology" 
                  className="rounded-xl shadow-2xl object-cover w-full h-full transform rotate-3 transition-transform hover:rotate-0 duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3hzz_RV6GUTZj9PBm7VIztkP7p1ItL_89SdPxWgdPg3zbwoC_oUXYiOHrca3VF6jxa94d1EdkFKgRfpSGDl3RGFSYOt6r8dW7giMvltOJjr1bclFM9e_Esmxuu37FQG-IoGl7VvtvmJ9CipkbFl7BOfVbab9eXrb-l5pEndZRzPJs5VF-bGuqhUnKbnbyG-jS6J-eJl6hxfquNgBXWu22rPElijsS94Pc9XBHSoiqp2u5SNITHZOzSQgDNMOYmVl_cdb8aurYv1q-"
                />

                {/* Floating Badges */}
                <div className="absolute -top-4 -right-4 glass-card px-4 py-2 rounded-full flex items-center gap-2 shadow-lg border border-white/50">
                  <span className="material-symbols-outlined text-yellow-500 text-sm">auto_awesome</span>
                  <span className="text-xs font-bold text-slate-800">500+ New Events</span>
                </div>
                <div className="absolute -bottom-4 -left-4 glass-card px-4 py-2 rounded-full flex items-center gap-2 shadow-lg border border-white/50">
                  <span className="material-symbols-outlined text-primary text-sm">verified</span>
                  <span className="text-xs font-bold text-slate-800">Verified Students Only</span>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="flex justify-center lg:justify-end">
              <div className="glass-card w-full max-w-[480px] rounded-xl p-8 lg:p-12 transition-all duration-500">
                {/* Tabs */}
                <div className="flex border-b border-slate-200 dark:border-slate-700 mb-8 gap-8">
                  <button 
                    onClick={() => setActiveTab('login')}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-3 font-bold transition-all ${activeTab === 'login' ? 'border-primary text-slate-900 dark:text-slate-100' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}>
                    <span>Login</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('signup')}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-3 font-bold transition-all ${activeTab === 'signup' ? 'border-primary text-slate-900 dark:text-slate-100' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}>
                    <span>Create Account</span>
                  </button>
                </div>

                {/* Form Header */}
                <div className="mb-8">
                  {activeTab === 'login' ? (
                    <>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Welcome back!</h3>
                      <p className="text-slate-500 dark:text-slate-400">Please enter your details to sign in.</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Join Eventify!</h3>
                      <p className="text-slate-500 dark:text-slate-400">Create your account to discover amazing campus events.</p>
                    </>
                  )}
                </div>

                {/* Login Form */}
                {activeTab === 'login' && (
                <form className="space-y-5" onSubmit={handleLoginSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Student Email</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">mail</span>
                      <input 
                        className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary input-focus-glow transition-all" 
                        placeholder="name@university.edu" 
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                      <a className="text-xs font-bold text-primary hover:underline" href="#forgot">Forgot password?</a>
                    </div>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">lock</span>
                      <input 
                        className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary input-focus-glow transition-all" 
                        placeholder="••••••••" 
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginInputChange}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-1">
                    <input 
                      className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300 dark:border-slate-700" 
                      id="remember" 
                      type="checkbox"
                      name="rememberMe"
                      checked={loginData.rememberMe}
                      onChange={handleLoginInputChange}
                    />
                    <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="remember">Keep me logged in</label>
                  </div>

                  {loginMessage.text && (
                    <div className={`p-4 rounded-full text-center text-sm font-semibold ${
                      loginMessage.type === 'error' 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300' 
                        : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300'
                    }`}>
                      {loginMessage.text}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={loginLoading}
                    className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/60 text-white font-bold py-4 rounded-full shadow-lg shadow-primary/25 transition-all glow-hover flex items-center justify-center gap-2 group"
                  >
                    {loginLoading ? (
                      <>
                        <span className="inline-block animate-spin">
                          <span className="material-symbols-outlined">hourglass</span>
                        </span>
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </>
                    )}
                  </button>
                </form>
                )}

                {/* Sign Up Form */}
                {activeTab === 'signup' && (
                <form className="space-y-5" onSubmit={handleSignupSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">person</span>
                      <input 
                        className="w-full pl-14 pr-4 py-4 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary input-focus-glow transition-all" 
                        placeholder="John Doe" 
                        type="text"
                        name="fullName"
                        value={signupData.fullName}
                        onChange={handleSignupInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Student Email</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">mail</span>
                      <input 
                        className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary input-focus-glow transition-all" 
                        placeholder="name@university.edu" 
                        type="email"
                        name="email"
                        value={signupData.email}
                        onChange={handleSignupInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Password</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">lock</span>
                      <input 
                        className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary input-focus-glow transition-all" 
                        placeholder="••••••••" 
                        type="password"
                        name="password"
                        value={signupData.password}
                        onChange={handleSignupInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Confirm Password</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">lock_check</span>
                      <input 
                        className="w-full pl-14 pr-4 py-4 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary input-focus-glow transition-all" 
                        placeholder="••••••••" 
                        type="password"
                        name="confirmPassword"
                        value={signupData.confirmPassword}
                        onChange={handleSignupInputChange}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-1">
                    <input 
                      className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300 dark:border-slate-700" 
                      id="agree" 
                      type="checkbox"
                      name="agree"
                      checked={signupData.agree}
                      onChange={handleSignupInputChange}
                    />
                    <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="agree">I agree to Terms & Conditions</label>
                  </div>

                  {signupMessage.text && (
                    <div className={`p-4 rounded-full text-center text-sm font-semibold ${
                      signupMessage.type === 'error' 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300' 
                        : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300'
                    }`}>
                      {signupMessage.text}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={signupLoading}
                    className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/60 text-white font-bold py-4 rounded-full shadow-lg shadow-primary/25 transition-all glow-hover flex items-center justify-center gap-2 group"
                  >
                    {signupLoading ? (
                      <>
                        <span className="inline-block animate-spin">
                          <span className="material-symbols-outlined">hourglass</span>
                        </span>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </>
                    )}
                  </button>
                </form>
                )}

                {/* Social Login */}
                <div className="mt-10">
                  <div className="relative flex items-center justify-center mb-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                    </div>
                    <span className="relative bg-white/0 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-3 py-3 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors">
                      <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6b8ypi9W6SqL5xY-GKbwmG6QFetaDHLJAr6aQyD-a4tBcQYZdfvSqdNqM8LPOpbCe-IhSf16_qXsyV4-LO_zO4EiGfkSlN_w-WkAsGgK3YShVCUZxUdSwRjLbLJomf3KWBmpQFR3faftMp5fib8kljwPS9xIiAVIeja_obykzFLt04R7B2aIoKX-PJ6gsqm41Y0tu12Rx9lW0XzrmQL4Y04uKRJQVJvCi2VeASwkPK6xbLM3AuLog8752YMd9-a9aB1H4zEKVWKJh" />
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-3 py-3 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors">
                      <span className="material-symbols-outlined text-slate-700 dark:text-slate-300 text-xl">badge</span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Student ID</span>
                    </button>
                  </div>
                </div>

                {/* Footer Links */}
                <p className="text-center mt-10 text-slate-500 dark:text-slate-400 text-sm">
                  {activeTab === 'login' ? (
                    <>
                      Don't have an account? 
                      <button onClick={() => setActiveTab('signup')} className="text-primary font-bold hover:underline ml-1 bg-none border-none cursor-pointer">Create an account</button>
                    </>
                  ) : (
                    <>
                      Already have an account? 
                      <button onClick={() => setActiveTab('login')} className="text-primary font-bold hover:underline ml-1 bg-none border-none cursor-pointer">Sign in</button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Page Footer */}
        <footer className="p-8 flex flex-col md:flex-row items-center justify-between text-slate-400 text-xs gap-4">
          <div className="flex items-center gap-6">
            <a className="hover:text-primary" href="#privacy">Privacy Policy</a>
            <a className="hover:text-primary" href="#terms">Terms of Service</a>
            <a className="hover:text-primary" href="#help">Help Center</a>
          </div>
          <p>© 2024 Eventify. Built for students, by students.</p>
        </footer>
      </div>
    </div>
  )
}
