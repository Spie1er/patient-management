import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { User } from './store/authStore'
import Patients from './pages/Patients'
import AddEditPatient from './pages/AddEditPatient'
import ProtectedRoute from './components/ProtectedRoute'

interface AppRoutesProps {
  user: Omit<User, 'password'> | null
}

const AppRoutes = (props: AppRoutesProps) => (
  <Routes>
    {!props.user ? <Route path='/' element={<Login />} /> : null}

    <Route
      path='/'
      element={
        <ProtectedRoute>
          <Patients />
        </ProtectedRoute>
      }
    />

    <Route
      path='/patients/add'
      element={
        <ProtectedRoute>
          <AddEditPatient />
        </ProtectedRoute>
      }
    />
    <Route
      path='/patients/edit/:id'
      element={
        <ProtectedRoute>
          <AddEditPatient />
        </ProtectedRoute>
      }
    />

    <Route path='*' element={<Navigate to='/' replace />} />
  </Routes>
)

export default AppRoutes
