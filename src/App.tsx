import { Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/SignupPage/SignupPage'
import Navbar from './components/Navbar/Navbar'
import BrowseAssignmentsPage from './pages/BrowseAssignmentsPage/BrowseAssignmentsPage'
import AssignmentPage from './pages/AssignmentPage/Assignment'

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/assignments/:id" element={<AssignmentPage />} />
        <Route path="/assignments" element={<BrowseAssignmentsPage />} />
      </Routes>
    </>
  )
}

export default App
