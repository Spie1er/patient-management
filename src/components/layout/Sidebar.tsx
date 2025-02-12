import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar: React.FC = () => {
  return (
    <aside className='w-64 bg-gray-200 dark:bg-gray-800 p-4 space-y-4'>
      <nav>
        <ul>
          <li>
            <Link
              to='/patients'
              className='block text-left text-lg py-2 px-4 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md'
            >
              Patients
            </Link>
          </li>
          <li>
            <Link
              to='/profile'
              className='block text-left text-lg py-2 px-4 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md'
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
