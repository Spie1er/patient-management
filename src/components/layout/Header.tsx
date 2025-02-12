import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ukFlag from '../../../public/ukflag.svg'
import kaFlag from '../../../public/kaFlag.svg'

interface HeaderProps {
  user: { username: string; role: string }
  logout: () => void
}

const Header: React.FC<HeaderProps> = ({ user, logout }) => {
  const { t, i18n } = useTranslation()

  // Function to change the language
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  // Get current language
  const currentLang = i18n.language

  // Set the opposite language to display the flag
  const oppositeLang = currentLang === 'ka' ? 'en' : 'ka'

  return (
    <header className='bg-gray-800 text-white p-4 shadow-md flex justify-between items-center'>
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
          პაციენტების სია
        </Link>
        |
        <Link
          to='/patients/add'
          className='px-3 py-2 transition duration-300 transform 
          hover:text-blue-400 hover:scale-105  
          focus:outline-none focus:ring-2 focus:ring-blue-500
          cursor-pointer'
        >
          პაციენტის დამატება
        </Link>
        | |
        <div className='flex items-center px-5 hover:scale-105 transition duration-300 transform'>
          <div onClick={() => changeLanguage(oppositeLang)} className='cursor-pointer'>
            {oppositeLang === 'en' ? (
              <img src={ukFlag} alt='English Flag' className='w-6 h-6' />
            ) : (
              <img src={kaFlag} alt='Georgian Flag' className='w-6 h-6' />
            )}
          </div>
        </div>
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
