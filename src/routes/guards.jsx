import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/auth/auth'

export function RequireRole({ allowed, children }){
  const { role } = useAuth()
  if (!allowed.includes(role)) return <Navigate to='/' replace />
  return children
}

export function HomeRedirect(){
  const { role } = useAuth()
  const map = { Teacher: '/teacher', InstituteAdmin: '/institute', Admin: '/admin', SuperAdmin: '/superadmin' }
  const to = map[role] || '/teacher'
  return <Navigate to={to} replace />
}
