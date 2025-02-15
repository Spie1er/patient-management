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
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') === 'dark'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme())

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  const currentLang = i18n.language
  const oppositeLang = currentLang === 'ka' ? 'en' : 'ka'

  return (
    <header className='bg-gray-800 dark:bg-gray-900 text-white p-4 shadow-md flex justify-between items-center'>
      <span className='text-lg font-semibold'>
        {t('welcome') + ' ' + user.username + ' ' + `(${t(`${user.role}`)})`}
      </span>
      <div className='flex items-center'>
        <Link
          to='/'
          className='pr-3 py-2 transition duration-300 transform 
          hover:text-blue-400 hover:scale-105 
          focus:outline-none focus:ring-2 focus:ring-blue-500
          cursor-pointer'
        >
          {t('patientsLIst')}
        </Link>
        |
        <Link
          to='/patients/add'
          className='px-3 py-2 transition duration-300 transform 
          hover:text-blue-400 hover:scale-105  
          focus:outline-none focus:ring-2 focus:ring-blue-500
          cursor-pointer'
        >
          {t('createPatient')}
        </Link>
        | |
        <div className='flex items-center px-5 hover:scale-105 transition duration-300 transform'>
          <div onClick={() => changeLanguage(oppositeLang)} className='cursor-pointer'>
            {oppositeLang === 'en' ? (
              <img src={ukflag} alt='English Flag' className='w-6 h-6' />
            ) : (
              <img src={geflag} alt='Georgian Flag' className='w-6 h-6' />
            )}
          </div>
        </div>
        | |{/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDarkMode((prev) => !prev)}
          className='text-white px-4 py-2 
          rounded-md transition duration-300 transform 
          hover:text-yellow-400 hover:scale-105  
          focus:outline-none focus:ring-2 focus:ring-yellow-500
          cursor-pointer flex items-center gap-2'
        >
          {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
        | |
        <a
          onClick={logout}
          className='text-white px-4 py-2 
          rounded-md transition duration-300 transform 
          hover:text-red-400 hover:scale-105  
          focus:outline-none focus:ring-2 focus:ring-red-500
          cursor-pointer'
        >
          {t('logout')}
        </a>
      </div>
    </header>
  )
}

export default Header
