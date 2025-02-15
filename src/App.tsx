import './App.css'
import { useAuthStore } from './store/authStore'
import AppRoutes from './routes'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'

function App() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      document.documentElement.classList.add(storedTheme)
    } else {
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      document.documentElement.classList.add(systemPreference)
    }
  }, [])

  return (
    <>
      <ToastContainer position='bottom-right' autoClose={3000} theme={'colored'} />
      {/* დავამატოთ  min-w-[480px] თუ საჭიროა რომ დილითის ღილაკი გამოჩნდეს ფინანსური ჩანაწერების ცხრილში */}
      <div className='min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900'>
        {user && <Header user={user} logout={logout} />}
        <div className='flex'>
          <main className='flex-1'>
            <AppRoutes user={user} />
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
