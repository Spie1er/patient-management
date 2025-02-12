import './App.css'
import { useAuthStore } from './store/authStore'
import AppRoutes from './routes'
import Header from './components/layout/Header'
// import Sidebar from './components/layout/Sidebar'
import Footer from './components/layout/Footer'
import { ToastContainer } from 'react-toastify'

function App() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <>
      <ToastContainer position='bottom-right' autoClose={3000} theme={'colored'} />
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
