import React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '@/auth/auth'
import { Home, ClipboardCheck, FileText, UploadCloud, BadgeCheck, Building2, Users2, ListChecks, Layers, Globe2, LineChart, Gavel, ShieldCheck, Settings, Menu, Info, Search, User, LogOut, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

const Brand = () => (
  <div className='flex items-center gap-2'>
    <ShieldCheck className='h-5 w-5'/>
    <span className='font-semibold tracking-wide'>MPO Transfer</span>
  </div>
)

export function Topbar(){
  const { role, setRole } = useAuth()
  return (
    <div className='h-14 border-b bg-white/70 backdrop-blur-sm sticky top-0 z-40'>
      <div className='mx-auto max-w-7xl h-full px-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Brand/>
          <Badge className='hidden sm:inline-flex'>Govt-Grade Demo</Badge>
          <div className='hidden md:flex items-center gap-2 pl-6'>
            <Search className='h-4 w-4'/>
            <Input placeholder='Quick search… (mock)' className='h-9 w-64'/>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <select value={role} onChange={e => setRole(e.target.value)} className='input w-[170px]'>
            {['Teacher','InstituteAdmin','Admin','SuperAdmin'].map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <Button variant='ghost' size='icon' aria-label='Notifications'><Bell className='h-5 w-5'/></Button>
          <Button variant='outline' size='sm' className='gap-2'><User className='h-4 w-4'/> Profile</Button>
          <Button variant='destructive' size='sm' className='gap-2'><LogOut className='h-4 w-4'/> Logout</Button>
        </div>
      </div>
    </div>
  )
}

export function Sidebar(){
  const { role } = useAuth()
  const menusByRole = {
    Teacher: [
      { to: '/teacher', label: 'Dashboard', icon: <Home className="h-4 w-4"/> },
      { to: '/teacher/apply', label: 'Apply Transfer', icon: <ClipboardCheck className="h-4 w-4"/> },
      { to: '/teacher/applications', label: 'My Applications', icon: <FileText className="h-4 w-4"/> },
      { to: '/teacher/documents', label: 'Documents (PDF)', icon: <UploadCloud className="h-4 w-4"/> },
    ],
    InstituteAdmin: [
      { to: '/institute', label: 'Dashboard', icon: <Home className="h-4 w-4"/> },
      { to: '/institute/verify', label: 'Verify', icon: <BadgeCheck className="h-4 w-4"/> },
      { to: '/institute/incoming', label: 'Incoming', icon: <Building2 className="h-4 w-4"/> },
      { to: '/institute/outgoing', label: 'Outgoing', icon: <Users2 className="h-4 w-4"/> },
    ],
    Admin: [
      { to: '/admin', label: 'Dashboard', icon: <Home className="h-4 w-4"/> },
      { to: '/admin/queue', label: 'Review Queue', icon: <ListChecks className="h-4 w-4"/> },
      { to: '/admin/scoring', label: 'Score & Recommend', icon: <Layers className="h-4 w-4"/> },
      { to: '/admin/notices', label: 'Circulars/Notices', icon: <Globe2 className="h-4 w-4"/> },
      { to: '/admin/reports', label: 'Reports', icon: <LineChart className="h-4 w-4"/> },
    ],
    SuperAdmin: [
      { to: '/superadmin', label: 'Dashboard', icon: <Home className="h-4 w-4"/> },
      { to: '/superadmin/final', label: 'Final Approvals', icon: <Gavel className="h-4 w-4"/> },
      { to: '/superadmin/audit', label: 'Audit Logs', icon: <ShieldCheck className="h-4 w-4"/> },
      { to: '/superadmin/policy', label: 'Policy & Settings', icon: <Settings className="h-4 w-4"/> },
    ]
  }
  const menus = menusByRole[role] || []
  return (
    <div className='w-full md:w-64 border-r bg-white/70 backdrop-blur-sm'>
      <div className='p-3 md:p-4 flex items-center gap-2 border-b'><Menu className='h-4 w-4'/><span className='font-medium'>Navigation</span></div>
      <div className='p-2 grid gap-1'>
        {menus.map(m => (
          <NavLink key={m.to} to={m.to} className={({isActive}) => `w-full btn ${isActive ? 'btn-outline bg-slate-100' : 'btn-outline'} justify-start gap-2`}>
            {m.icon}<span>{m.label}</span>
          </NavLink>
        ))}
      </div>
      <div className='mt-4 p-4 border-t text-xs text-slate-500 leading-relaxed'>
        <div className='flex items-center gap-2 font-medium text-sm mb-2'><Info className='h-4 w-4'/>Routing Guide</div>
        • Role বদলালে Sidebar menu role অনুযায়ী বদলায়।<br/>
        • Nested routes (children) দিয়ে প্রতিটি সেকশন আলাদা করা হয়েছে।
      </div>
    </div>
  )
}

export default function RootLayout(){
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900'>
      <Topbar />
      <div className='mx-auto max-w-7xl grid md:grid-cols-[240px_1fr] gap-0'>
        <Sidebar />
        <main className='p-4 md:p-6 space-y-4'><Outlet/></main>
      </div>
    </div>
  )
}
