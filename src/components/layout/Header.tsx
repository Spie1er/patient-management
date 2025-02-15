import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FaSun, FaMoon } from 'react-icons/fa'
import ukflag from '../../assets/ukflag.svg'
import geflag from '../../assets/geflag.svg'

interface HeaderProps {
  user: { username: string; role: string }
  logout: () => void
}

const Header: React.FC<HeaderProps> = ({ user, logout }) => {
  const { t, i18n } = useTranslation()

  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme')
      if (storedTheme) return storedTheme === 'dark'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme)

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  const currentLang = i18n.language
  const oppositeLang = currentLang === 'ka' ? 'en' : 'ka'

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark'
    document.documentElement.classList.replace(isDarkMode ? 'dark' : 'light', newTheme)
    localStorage.setItem('theme', newTheme)
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      document.documentElement.classList.add(storedTheme)
    }
  }, [])

  return (
    <header className='bg-gray-800 dark:bg-gray-900 text-white px-4 py-3 shadow-md w-full'>
      <div className='flex flex-col lg:flex-row justify-between items-center gap-2'>
        <span className='text-lg font-semibold text-center lg:text-left'>
          {t('welcome')} {user.username} ({t(user.role)})
        </span>

        <div className='flex flex-col sm:flex-row items-center gap-4'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => changeLanguage(oppositeLang)}
              className='w-6 h-6 focus:outline-none'
            >
              <img
                src={oppositeLang === 'en' ? ukflag : geflag}
                alt='Language Flag'
                className='w-6 h-6'
              />
            </button>

            <button onClick={toggleTheme} className='text-white focus:outline-none'>
              {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>

          <nav className='min-w-[340px] flex flex-wrap justify-center sm:justify-end gap-4'>
            <Link to='/' className='text-sm hover:text-blue-400 transition'>
              {t('patientsLIst')}
            </Link>
            <Link to='/patients/add' className='text-sm hover:text-blue-400 transition'>
              {t('createPatient')}
            </Link>
            <button onClick={logout} className='text-sm hover:text-red-400 transition'>
              {t('logout')}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
