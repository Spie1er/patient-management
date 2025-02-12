import './App.css'
import { useAuthStore } from './store/authStore'
import AppRoutes from './routes'
import Header from './components/layout/Header'
// import Sidebar from './components/layout/Sidebar'
import Footer from './components/layout/Footer'
import { ConfigProvider } from 'antd'

const darkTheme = {
  token: {
    colorPrimary: '#1DA57A',
    colorBgBase: '#1e1e1e',
    colorTextBase: '#e0e0e0',
    colorBorder: '#333',
    colorInputBg: '#333',
    colorInputText: '#fff',
    colorBgElevated: '#333',
  },
}

function App() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <ConfigProvider theme={darkTheme}>
      <div className='min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900'>
        {user && <Header user={user} logout={logout} />}

        <div className='flex'>
          <main className='flex-1'>
            <AppRoutes />
          </main>
        </div>

        <Footer />
      </div>
    </ConfigProvider>
  )
}

export default App
