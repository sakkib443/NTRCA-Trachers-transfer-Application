import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import { RequireRole, HomeRedirect } from '@/routes/guards'

// Teacher pages
import TeacherDashboard from '@/pages/teacher/Dashboard'
import Apply from '@/pages/teacher/Apply'
import Applications from '@/pages/teacher/Applications'
import Documents from '@/pages/teacher/Documents'

// Institute pages
import InstDashboard from '@/pages/institute/Dashboard'
import Verify from '@/pages/institute/Verify'
import Incoming from '@/pages/institute/Incoming'
import Outgoing from '@/pages/institute/Outgoing'

// Admin pages
import AdminDashboard from '@/pages/admin/Dashboard'
import Queue from '@/pages/admin/Queue'
import Scoring from '@/pages/admin/Scoring'
import NoticesPage from '@/pages/admin/Notices'
import ReportsPage from '@/pages/admin/Reports'

// SuperAdmin pages
import SADashboard from '@/pages/superadmin/Dashboard'
import Final from '@/pages/superadmin/Final'
import Audit from '@/pages/superadmin/Audit'
import Policy from '@/pages/superadmin/Policy'

export default function AppRoutes(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout/>}>
          <Route index element={<HomeRedirect/>} />

          <Route path='teacher' element={<RequireRole allowed={['Teacher']}><Outlet/></RequireRole>}>
            <Route index element={<TeacherDashboard/>} />
            <Route path='apply' element={<Apply/>} />
            <Route path='applications' element={<Applications/>} />
            <Route path='documents' element={<Documents/>} />
          </Route>

          <Route path='institute' element={<RequireRole allowed={['InstituteAdmin']}><Outlet/></RequireRole>}>
            <Route index element={<InstDashboard/>} />
            <Route path='verify' element={<Verify/>} />
            <Route path='incoming' element={<Incoming/>} />
            <Route path='outgoing' element={<Outgoing/>} />
          </Route>

          <Route path='admin' element={<RequireRole allowed={['Admin']}><Outlet/></RequireRole>}>
            <Route index element={<AdminDashboard/>} />
            <Route path='queue' element={<Queue/>} />
            <Route path='scoring' element={<Scoring/>} />
            <Route path='notices' element={<NoticesPage/>} />
            <Route path='reports' element={<ReportsPage/>} />
          </Route>

          <Route path='superadmin' element={<RequireRole allowed={['SuperAdmin']}><Outlet/></RequireRole>}>
            <Route index element={<SADashboard/>} />
            <Route path='final' element={<Final/>} />
            <Route path='audit' element={<Audit/>} />
            <Route path='policy' element={<Policy/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
