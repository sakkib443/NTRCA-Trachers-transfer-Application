import React from 'react'
import { AuthProvider } from '@/auth/auth'
import AppRoutes from '@/routes/AppRoutes'

export default function App(){
  return (
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  )
}
