import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
// import Patients from './pages/Patients'
// import AddPatient from './pages/AddPatient'
// import EditPatient from './pages/EditPatient'
// import ProtectedRoute from './components/ProtectedRoute'

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Login />} />
    {/* 
      <Route
        path="/patients"
        element={
          <ProtectedRoute>
            <Patients />
          </ProtectedRoute>
        }
      />
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
