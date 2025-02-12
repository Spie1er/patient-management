import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface HeaderProps {
  user: { username: string; role: string }
  logout: () => void
}

const Header: React.FC<HeaderProps> = ({ user, logout }) => {
  const { t } = useTranslation()
  return (
    <header className='bg-gray-800 text-white p-4 shadow-md flex justify-between items-center'>
      <span className='text-lg font-semibold'>
        {t('welcome') + ' ' + user.username + ' ' + `(${t(`${user.role}`)})`}
      </span>
      <div>
        <Link
          to='/'
          className='pr-3 py-2 transition duration-300 transform 
          hover:text-blue-400 hover:scale-105 hover:rotate-2 
          focus:outline-none focus:ring-2 focus:ring-blue-500
          cursor-pointer'
        >
          პაციენტების სია
        </Link>
        |
        <Link
          to='/patients/add'
          className='px-3 py-2 transition duration-300 transform 
          hover:text-blue-400 hover:scale-105 hover:rotate-2 
          focus:outline-none focus:ring-2 focus:ring-blue-500
          cursor-pointer'
        >
          პაციენტის დამატება
        </Link>
        | |
        <a
          onClick={logout}
          className='text-white px-4 py-2 
          rounded-md transition duration-300 transform 
          hover:text-red-400 hover:scale-105 hover:rotate-2 
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
