import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { StoreProvider } from './lib/store'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Documents from './pages/Documents'
import Students from './pages/Students'
import Teachers from './pages/Teachers'
import Timetable from './pages/Timetable'
import Conflicts from './pages/Conflicts'
import Attendance from './pages/Attendance'
import Staffing from './pages/Staffing'
import Analytics from './pages/Analytics'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import { Classes, Subjects, Rooms, Operations } from './pages/SimplePages'

function Shell({children}:{children:React.ReactNode}){
  return <Layout>{children}</Layout>
}

export default function App(){
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
          <Route path="/dashboard" element={<Shell><Dashboard/></Shell>}/>
          <Route path="/operations" element={<Shell><Operations/></Shell>}/>
          <Route path="/documents" element={<Shell><Documents/></Shell>}/>
          <Route path="/students" element={<Shell><Students/></Shell>}/>
          <Route path="/teachers" element={<Shell><Teachers/></Shell>}/>
          <Route path="/classes" element={<Shell><Classes/></Shell>}/>
          <Route path="/subjects" element={<Shell><Subjects/></Shell>}/>
          <Route path="/rooms" element={<Shell><Rooms/></Shell>}/>
          <Route path="/timetable" element={<Shell><Timetable/></Shell>}/>
          <Route path="/conflicts" element={<Shell><Conflicts/></Shell>}/>
          <Route path="/attendance" element={<Shell><Attendance/></Shell>}/>
          <Route path="/analytics" element={<Shell><Analytics/></Shell>}/>
          <Route path="/staffing" element={<Shell><Staffing/></Shell>}/>
          <Route path="/notifications" element={<Shell><Notifications/></Shell>}/>
          <Route path="/settings" element={<Shell><Settings/></Shell>}/>
          <Route path="*" element={<Shell><Dashboard/></Shell>}/>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}
