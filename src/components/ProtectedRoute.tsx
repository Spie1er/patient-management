import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { JSX } from 'react'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAuthStore((state) => state.user)
  return user ? children : <Navigate to='/' replace />
}

export default ProtectedRoute
