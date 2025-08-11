import React, { useMemo, useState } from 'react'
import {
  Bell, CheckCircle2, ClipboardCheck, FileText, Gavel, Globe2, Home, LineChart, LogOut, Menu, School, Settings,
  ShieldCheck, User, Users2, Layers, MapPin, Info, Search, Download, UploadCloud, ArrowRight, CalendarClock, Building2, Filter, ListChecks, BadgeCheck
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'

const ROLES = ['Teacher','InstituteAdmin','Admin','SuperAdmin']

export const sampleApps = [
  {
    id: 'APP-2025-001',
    teacherName: 'Sadia Akter',
    subject: 'Computer Science',
    currentInstitute: 'Dhaka Tech College',
    preferred: ['Uttara Tech Institute', 'Tejgaon Polytechnic', 'Mirpur Technical'],
    distanceKm: 6,
    seniorityYears: 4,
    gender: 'Female',
    spouseSameDistrict: true,
    status: 'pending',
  },
  {
    id: 'APP-2025-002',
    teacherName: 'Rahim Uddin',
    subject: 'Electrical',
    currentInstitute: 'Gazipur Technical School',
    preferred: ['Khilkhet Vocational', 'Banani Tech', 'Tejgaon Polytechnic'],
    distanceKm: 22,
    seniorityYears: 11,
    gender: 'Male',
    spouseSameDistrict: false,
    status: 'headmaster_verified',
  },
  {
    id: 'APP-2025-003',
    teacherName: 'Fatema Khatun',
    subject: 'Civil',
    currentInstitute: 'Narayanganj Polytechnic',
    preferred: ['Mohakhali Tech Institute'],
    distanceKm: 2,
    seniorityYears: 19,
    gender: 'Female',
    spouseSameDistrict: true,
    status: 'admin_approved',
  },
]

function calcDistanceScore(km){
  if (km <= 3) return 40;
  if (km <= 8) return 30;
  if (km <= 18) return 20;
  if (km <= 30) return 10;
  return 5;
}
function calcSeniorityScore(years){
  if (years <= 5) return 30;
  if (years <= 12) return 20;
  if (years <= 20) return 15;
  if (years <= 30) return 10;
  return 5;
}
function computePriorityScore(a){
  const distance = calcDistanceScore(a.distanceKm);
  const seniority = calcSeniorityScore(a.seniorityYears);
  const gender = a.gender === 'Female' ? 15 : 0;
  const spouse = a.spouseSameDistrict ? 15 : 0;
  return distance + seniority + gender + spouse;
}

const Brand = () => (
  <div className='flex items-center gap-2'>
    <ShieldCheck className='h-5 w-5'/>
    <span className='font-semibold tracking-wide'>MPO Transfer</span>
  </div>
)

function Topbar({ role, onRoleChange }){
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
          <select value={role} onChange={e => onRoleChange(e.target.value)} className='input w-[170px]'>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <Button variant='ghost' size='icon' aria-label='Notifications'><Bell className='h-5 w-5'/></Button>
          <Button variant='outline' size='sm' className='gap-2'><User className='h-4 w-4'/> Profile</Button>
          <Button variant='destructive' size='sm' className='gap-2'><LogOut className='h-4 w-4'/> Logout</Button>
        </div>
      </div>
    </div>
  )
}

function Sidebar({ role, current, onNavigate }){
  const base = [{ key: 'home', label: 'Dashboard', icon: <Home className='h-4 w-4'/> }]
  const teacher = [
    { key: 'apply', label: 'Apply Transfer', icon: <ClipboardCheck className='h-4 w-4'/> },
    { key: 'applications', label: 'My Applications', icon: <FileText className='h-4 w-4'/> },
    { key: 'documents', label: 'Documents (PDF)', icon: <UploadCloud className='h-4 w-4'/> },
  ]
  const institute = [
    { key: 'verify', label: 'Verify Applications', icon: <BadgeCheck className='h-4 w-4'/> },
    { key: 'incoming', label: 'Incoming to Institute', icon: <Building2 className='h-4 w-4'/> },
    { key: 'outgoing', label: 'Outgoing from Institute', icon: <Users2 className='h-4 w-4'/> },
  ]
  const admin = [
    { key: 'queue', label: 'Review Queue', icon: <ListChecks className='h-4 w-4'/> },
    { key: 'scoring', label: 'Score & Recommend', icon: <Layers className='h-4 w-4'/> },
    { key: 'notices', label: 'Circulars/Notices', icon: <Globe2 className='h-4 w-4'/> },
    { key: 'reports', label: 'Reports', icon: <LineChart className='h-4 w-4'/> },
  ]
  const superadmin = [
    { key: 'final', label: 'Final Approvals', icon: <Gavel className='h-4 w-4'/> },
    { key: 'audit', label: 'Audit Logs', icon: <ShieldCheck className='h-4 w-4'/> },
    { key: 'policy', label: 'Policy & Settings', icon: <Settings className='h-4 w-4'/> },
  ]

  const roleMenus = { Teacher: teacher, InstituteAdmin: institute, Admin: admin, SuperAdmin: superadmin }
  const menus = [...base, ...roleMenus[role]]

  return (
    <div className='w-full md:w-64 border-r bg-white/70 backdrop-blur-sm'>
      <div className='p-3 md:p-4 flex items-center gap-2 border-b'><Menu className='h-4 w-4'/><span className='font-medium'>Navigation</span></div>
      <div className='p-2'>
        {menus.map(m => (
          <Button key={m.key} variant={current === m.key ? 'secondary' : 'outline'} className='w-full justify-start gap-2 my-1'
                  onClick={() => onNavigate(m.key)}>
            {m.icon}<span>{m.label}</span>
          </Button>
        ))}
      </div>
      <div className='mt-4 p-4 border-t text-xs text-slate-500 leading-relaxed'>
        <div className='flex items-center gap-2 font-medium text-sm mb-2'><Info className='h-4 w-4'/>Demo Guide</div>
        • Role switcher দিয়ে আলাদা ভিউ দেখুন।<br/>
        • টেবিলের সারিতে ক্লিক করলে ডিটেইল পেজ ওপেন হবে।<br/>
        • “Score & Recommend”, “Final Approvals”–এ অ্যাকশন নিন (mock).<br/>
        • ডকুমেন্ট আপলোড/ডাউনলোড বাটনগুলো ডেমো ইন্টারঅ্যাকশন দেখায়।
      </div>
    </div>
  )
}

function StatusPill({ s }){
  const map = {
    pending: { label: 'Pending', variant: 'outline' },
    headmaster_verified: { label: 'Verified', variant: 'secondary' },
    admin_approved: { label: 'Admin Approved', variant: 'default' },
    selected: { label: 'Selected', variant: 'default' },
    rejected: { label: 'Rejected', variant: 'destructive' },
  }
  const { label, variant } = map[s]
  return <Badge variant={variant}>{label}</Badge>
}

function DashboardHeader({ title, sub }){
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h1 className='text-xl md:text-2xl font-semibold'>{title}</h1>
        {sub && <p className='text-sm text-slate-500 mt-1'>{sub}</p>}
      </div>
      <div className='hidden md:flex gap-2'>
        <Button variant='outline' size='sm' className='gap-2'><Download className='h-4 w-4'/> Export</Button>
        <Button size='sm' className='gap-2'><UploadCloud className='h-4 w-4'/> Upload</Button>
      </div>
    </div>
  )
}

function TeacherHome({ onOpen }){
  const myApps = sampleApps.filter(a => a.teacherName.includes('Sadia'))
  const latest = myApps[0]
  const completion = 82

  
  return (
    <div className='space-y-4'>
      <DashboardHeader title='Teacher Dashboard' sub='Profile • Application • Documents' />
      <div className='grid md:grid-cols-3 gap-4'>
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'><ClipboardCheck className='h-5 w-5'/> Transfer Application Status</CardTitle>
            <CardDescription>আপনার সর্বশেষ আবেদনের সারাংশ</CardDescription>
          </CardHeader>
          <CardContent>
            {latest ? (
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <div className='font-medium'>{latest.id}</div>
                  <StatusPill s={latest.status} />
                </div>
                <div className='text-sm text-slate-500'>Preferred: {latest.preferred.join(', ')}</div>
                <Progress value={completion} className='h-2' />
                <div className='text-xs text-slate-500'>Progress: {completion}%</div>
                <div className='flex gap-2'>
                  <Button size='sm' onClick={() => onOpen(latest.id)} className='gap-2'><FileText className='h-4 w-4'/> View Details</Button>
                  <Button size='sm' variant='outline' className='gap-2'><Download className='h-4 w-4'/> Download Receipt (PDF)</Button>
                </div>
              </div>
            ) : (
              <div className='text-sm text-slate-500'>No application yet. Click “Apply Transfer”.</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className='flex items-center gap-2'><User className='h-5 w-5'/> Profile Completeness</CardTitle></CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <Progress value={completion} className='h-2' />
              <div className='text-sm'>82% complete</div>
              <div className='flex flex-col gap-2 text-xs text-slate-500'>
                <div>✅ NID verified</div>
                <div>✅ Photo uploaded</div>
                <div>⚠️ Spouse document pending</div>
              </div>
              <Button variant='outline' size='sm' className='w-full'>Update Profile</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'><UploadCloud className='h-5 w-5'/> Documents</CardTitle>
          <CardDescription>PDF uploads: spouse NID, medical, others</CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='grid md:grid-cols-3 gap-3'>
            <div className='space-y-2'><Label>NID (PDF)</Label><Input type='file'/></div>
            <div className='space-y-2'><Label>Spouse NID (PDF)</Label><Input type='file'/></div>
            <div className='space-y-2'><Label>NTRCA Documents(PDF)</Label><Input type='file'/></div>
          </div>
          <Button className='gap-2'><UploadCloud className='h-4 w-4'/> Upload All</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function TeacherApply(){
  return (
    <div className='space-y-4'>
      <DashboardHeader title='Apply for Transfer' sub='এক সেশনে একবার আবেদন করা যাবে' />
      <Card>
        <CardContent className='space-y-4 pt-6'>
          <div className='grid md:grid-cols-3 gap-4'>
            <div>
              <Label>Subject</Label>
              <input className='input' defaultValue='Computer Science'/>
            </div>
            <div>
              <Label>Designation</Label>
              <input className='input' defaultValue='Lecturer'/>
            </div>
            <div>
              <Label>NTRCA Batch</Label>
              <Input placeholder='e.g., 12' />
            </div>
          </div>

          <div className='grid md:grid-cols-3 gap-4'>
            <div><Label>Preferred Institute 1</Label><Input placeholder='e.g., Tejgaon Polytechnic' /></div>
            <div><Label>Preferred Institute 2</Label><Input placeholder='Optional' /></div>
            <div><Label>Preferred Institute 3</Label><Input placeholder='Optional' /></div>
          </div>

          <div className='grid md:grid-cols-3 gap-4'>
            <div><Label>Distance from Home (km)</Label><Input type='number' defaultValue={6} /></div>
            <div><Label>Seniority (years)</Label><Input type='number' defaultValue={4} /></div>
            <div><Label>Spouse workplace same district?</Label><div className='flex items-center gap-3 pt-2'><Switch defaultChecked /> <span className='text-sm'>Yes</span></div></div>
          </div>

          <div><Label>Reason</Label><Textarea placeholder='Write reason for transfer…' /></div>

          <div className='flex items-center justify-between'>
            <div className='text-sm text-slate-500'>You can submit <b>once</b> this session.</div>
            <Button className='gap-2'><ClipboardCheck className='h-4 w-4'/> Submit Application</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ApplicationsTable({ items, onOpen }){
  return (
    <Card>
      <CardHeader><CardTitle className='flex items-center gap-2'><FileText className='h-5 w-5'/> Applications</CardTitle></CardHeader>
      <CardContent>
        <div className='flex items-center gap-2 pb-3'>
          <Input placeholder='Search by ID/Name…' className='max-w-xs'/>
          <Button variant='outline' size='sm' className='gap-2'><Filter className='h-4 w-4'/> Filter</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Current Institute</TableHead>
              <TableHead>Preferred</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(a => (
              <TableRow key={a.id} className='cursor-pointer hover:bg-slate-50' onClick={() => onOpen(a.id)}>
                <TableCell className='font-medium'>{a.id}</TableCell>
                <TableCell>{a.teacherName}</TableCell>
                <TableCell>{a.subject}</TableCell>
                <TableCell>{a.currentInstitute}</TableCell>
                <TableCell className='truncate max-w-[220px]'>{a.preferred.join(', ')}</TableCell>
                <TableCell><StatusPill s={a.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function ApplicationDetail({ app, role, onStatus }){
  const score = computePriorityScore(app)
  return (
    <div className='space-y-4'>
      <DashboardHeader title={`${app.id} – ${app.teacherName}`} sub={`${app.subject} • ${app.currentInstitute}`} />
      <div className='grid md:grid-cols-3 gap-4'>
        <Card className='md:col-span-2'>
          <CardHeader><CardTitle>Application Data</CardTitle><CardDescription>Preferred institutes, reason, metrics</CardDescription></CardHeader>
          <CardContent className='space-y-2 text-sm'>
            <div><b>Preferred:</b> {app.preferred.join(', ')}</div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-slate-500'>
              <div className='p-2 rounded-md border'><div className='font-medium'>Distance</div>{app.distanceKm} km</div>
              <div className='p-2 rounded-md border'><div className='font-medium'>Seniority</div>{app.seniorityYears} yrs</div>
              <div className='p-2 rounded-md border'><div className='font-medium'>Gender</div>{app.gender}</div>
              <div className='p-2 rounded-md border'><div className='font-medium'>Spouse</div>{app.spouseSameDistrict ? 'Same district' : 'Different'}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Priority Score</CardTitle><CardDescription>Auto-calculated from policy</CardDescription></CardHeader>
          <CardContent className='space-y-3'>
            <div className='text-3xl font-semibold'>{score}</div>
            <div className='text-xs text-slate-500'>Max 100</div>
            <div className='space-y-2 text-xs text-slate-500'>
              <div>Distance: {calcDistanceScore(app.distanceKm)} / 40</div>
              <div>Seniority: {calcSeniorityScore(app.seniorityYears)} / 30</div>
              <div>Gender: {app.gender === 'Female' ? 15 : 0} / 15</div>
              <div>Spouse: {app.spouseSameDistrict ? 15 : 0} / 15</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Actions</CardTitle><CardDescription>Role-based decisions</CardDescription></CardHeader>
        <CardContent className='flex flex-wrap gap-2'>
          {role === 'InstituteAdmin' && (<><Button className='gap-2' onClick={() => onStatus('headmaster_verified')}><CheckCircle2 className='h-4 w-4'/> Verify</Button><Button variant='outline'>Add Remarks</Button></>)}
          {role === 'Admin' && (<><Button className='gap-2' onClick={() => onStatus('admin_approved')}><CheckCircle2 className='h-4 w-4'/> Approve</Button><Button variant='outline'>Recalculate Score</Button><Button variant='outline'>Return to Teacher</Button></>)}
          {role === 'SuperAdmin' && (<><Button className='gap-2' onClick={() => onStatus('selected')}><Gavel className='h-4 w-4'/> Final Approve</Button><Button variant='outline'>Override Admin Decision</Button></>)}
          <Button variant='destructive'>Reject</Button>
          <Button variant='outline' className='gap-2'><Download className='h-4 w-4'/> Download Letter (PDF)</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function InstituteQueues({ onOpen }){
  const outgoing = sampleApps.filter(a => ['pending','headmaster_verified'].includes(a.status))
  const incoming = sampleApps.filter(a => ['admin_approved'].includes(a.status))
  const [tab, setTab] = useState('outgoing')

  return (
    <div className='space-y-4'>
      <DashboardHeader title='Institute Review' sub='Outgoing / Incoming' />
      <div>
        <div className='flex gap-2 mb-3'>
          <button className={`tab-btn ${tab==='outgoing'?'tab-btn-active':''}`} onClick={()=>setTab('outgoing')}>Outgoing</button>
          <button className={`tab-btn ${tab==='incoming'?'tab-btn-active':''}`} onClick={()=>setTab('incoming')}>Incoming</button>
        </div>
        {tab==='outgoing' ? <ApplicationsTable items={outgoing} onOpen={onOpen}/> : <ApplicationsTable items={incoming} onOpen={onOpen}/>}
      </div>
    </div>
  )
}

function AdminScoring({ onOpen }){
  const queue = sampleApps.filter(a => ['headmaster_verified','admin_approved'].includes(a.status))
  return (
    <div className='space-y-4'>
      <DashboardHeader title='Score & Recommend' sub='Compute and adjust priority score' />
      <ApplicationsTable items={queue} onOpen={onOpen} />
    </div>
  )
}

function SuperFinal({ onOpen }){
  const ready = sampleApps.filter(a => ['admin_approved'].includes(a.status))
  return (
    <div className='space-y-4'>
      <DashboardHeader title='Final Approvals' sub='Approve/Reject and publish results' />
      <ApplicationsTable items={ready} onOpen={onOpen} />
    </div>
  )
}

function Notices(){
  return (
    <div className='space-y-4'>
      <DashboardHeader title='Circulars / Notices' sub='Publish PDF notices for sessions' />
      <Card>
        <CardContent className='pt-6 space-y-3'>
          <div className='grid md:grid-cols-3 gap-3'>
            <div className='space-y-2'><Label>Title</Label><Input placeholder='২০২৫ সেশন বদলি আবেদন বিজ্ঞপ্তি' /></div>
            <div className='space-y-2'><Label>Publish Date</Label><Input type='date' /></div>
            <div className='space-y-2'><Label>Upload PDF</Label><Input type='file' /></div>
          </div>
          <Button className='gap-2'><UploadCloud className='h-4 w-4'/> Publish Notice</Button>
          <div className='text-sm text-slate-500'>Published notices will appear on the Teacher & Institute dashboards.</div>
        </CardContent>
      </Card>
    </div>
  )
}

function Reports(){
  return (
    <div className='space-y-4'>
      <DashboardHeader title='Reports & Analytics' sub='District / Institute / Subject-wise reports' />
      <div className='grid md:grid-cols-3 gap-4'>
        <Card><CardHeader><CardTitle>District-wise Transfers</CardTitle></CardHeader><CardContent><div className='text-sm text-slate-500'>(Chart placeholder)</div><div className='mt-2 h-32 rounded-md border grid place-items-center'>Graph</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Institute Quota Usage</CardTitle></CardHeader><CardContent><div className='text-sm text-slate-500'>(Chart placeholder)</div><div className='mt-2 h-32 rounded-md border grid place-items-center'>Graph</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Subject-wise Applications</CardTitle></CardHeader><CardContent><div className='text-sm text-slate-500'>(Chart placeholder)</div><div className='mt-2 h-32 rounded-md border grid place-items-center'>Graph</div></CardContent></Card>
      </div>
    </div>
  )
}

function AuditLogs(){
  const rows = [
    { time: '2025-08-10 11:22', actor: 'Admin-01', role: 'Admin', action: 'approve', target: 'APP-2025-003', ip: '103.145.12.2' },
    { time: '2025-08-10 11:25', actor: 'SAdmin-01', role: 'SuperAdmin', action: 'override', target: 'APP-2025-002', ip: '103.145.12.2' },
  ]
  return (
    <div className='space-y-4'>
      <DashboardHeader title='Audit Logs' sub='Full decision trace & accountability' />
      <Card>
        <CardContent className='pt-6'>
          <table className='table'>
            <thead><tr><th>Timestamp</th><th>Actor</th><th>Role</th><th>Action</th><th>Target</th><th>IP</th></tr></thead>
            <tbody>
              {rows.map((r,i)=>(<tr key={i}><td>{r.time}</td><td>{r.actor}</td><td>{r.role}</td><td>{r.action}</td><td>{r.target}</td><td>{r.ip}</td></tr>))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

function PolicySettings(){
  return (
    <div className='space-y-4'>
      <DashboardHeader title='Policy & Settings' sub='Quota, eligibility & session control' />
      <Card>
        <CardContent className='pt-6 space-y-4'>
          <div className='grid md:grid-cols-3 gap-4'>
            <div><Label>Max outgoing transfers per institute (yearly)</Label><Input type='number' defaultValue={2} /></div>
            <div><Label>Max transfers per teacher (lifetime)</Label><Input type='number' defaultValue={3} /></div>
            <div><Label>Session Active?</Label><div className='pt-2'><Switch defaultChecked /></div></div>
          </div>
          <Button className='gap-2'><CheckCircle2 className='h-4 w-4'/> Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function MpoTransferDemo(){
  const [role, setRole] = useState('Teacher')
  const [page, setPage] = useState('home')
  const [openId, setOpenId] = useState(null)

  const selectedApp = useMemo(() => sampleApps.find(a => a.id === openId) || null, [openId])

  let content = null
  if (selectedApp){
    content = <ApplicationDetail app={selectedApp} role={role} onStatus={(s)=>{ selectedApp.status = s; setOpenId(null); }} />
  } else {
    if (role === 'Teacher'){
      if (page === 'home') content = <TeacherHome onOpen={setOpenId} />
      if (page === 'apply') content = <TeacherApply />
      if (page === 'applications') content = <ApplicationsTable items={sampleApps.filter(a => a.teacherName.includes('Sadia'))} onOpen={setOpenId} />
      if (page === 'documents') content = <TeacherHome onOpen={setOpenId} />
    }
    if (role === 'InstituteAdmin'){
      if (page === 'home') content = <InstituteQueues onOpen={setOpenId} />
      if (['verify','incoming','outgoing'].includes(page)) content = <InstituteQueues onOpen={setOpenId} />
    }
    if (role === 'Admin'){
      if (page === 'home') content = <AdminScoring onOpen={setOpenId} />
      if (page === 'queue' || page === 'scoring') content = <AdminScoring onOpen={setOpenId} />
      if (page === 'notices') content = <Notices />
      if (page === 'reports') content = <Reports />
    }
    if (role === 'SuperAdmin'){
      if (page === 'home') content = <SuperFinal onOpen={setOpenId} />
      if (page === 'final') content = <SuperFinal onOpen={setOpenId} />
      if (page === 'audit') content = <AuditLogs />
      if (page === 'policy') content = <PolicySettings />
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900'>
      <Topbar role={role} onRoleChange={(r)=>{ setRole(r); setPage('home'); setOpenId(null) }} />
      <div className='mx-auto max-w-7xl grid md:grid-cols-[240px_1fr] gap-0'>
        <Sidebar role={role} current={page} onNavigate={(k)=>setPage(k)} />
        <main className='p-4 md:p-6 space-y-4'>
          {content}
          <Card>
            <CardContent className='pt-6 text-xs text-slate-500'>
              <div className='flex items-center gap-2 mb-2'><Info className='h-4 w-4'/>Presentation Pointers</div>
              • এই ডেমোতে আপনার টেন্ডার/প্রেজেন্টেশনের জন্য প্রয়োজনীয় সব মূল ফ্লো দেখানো হয়েছে।<br/>
              • Live Demo করতে Role পরিবর্তন করে Queue → Detail → Action নিন।<br/>
              • আমরা আপনার Branding, Bengali-Only UI, এবং Real Data API পরে প্লাগ-ইন করব।
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}


export {
  TeacherHome as TeacherDashboard,
  TeacherApply,
  ApplicationsTable,
  InstituteQueues,
  AdminScoring,
  Notices,
  Reports,
  SuperFinal,
  AuditLogs,
  PolicySettings
}
