import React from 'react'

interface HeaderProps {
  user: { username: string; role: string }
  logout: () => void
}

const Header: React.FC<HeaderProps> = ({ user, logout }) => {
  return (
    <header className='bg-gray-800 text-white p-4 shadow-md flex justify-between items-center'>
      <span className='text-lg font-semibold'>
        Welcome, {user.username} ({user.role})
      </span>
      <button
        onClick={logout}
        className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300'
      >
        Logout
      </button>
    </header>
  )
}

export default Header
