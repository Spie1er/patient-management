import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { User } from './store/authStore'
import Patients from './pages/Patients'
// import AddPatient from './pages/AddPatient'
// import EditPatient from './pages/EditPatient'
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
    {/* 
       <Route
        path="/patients/add"
        element={
          <ProtectedRoute>
            <AddPatient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients/edit/:id"
        element={
          <ProtectedRoute>
            <EditPatient />
          </ProtectedRoute>
        }
      /> 
      */}
    <Route path='*' element={<Navigate to='/' replace />} />
  </Routes>
)

export default AppRoutes
