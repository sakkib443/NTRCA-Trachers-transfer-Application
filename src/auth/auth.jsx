import React, { createContext, useContext, useState } from 'react'

const AuthCtx = createContext(null)

export function AuthProvider({ children }){
  const [role, setRole] = useState('Teacher') // Teacher | InstituteAdmin | Admin | SuperAdmin
  const value = { role, setRole }
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth(){ 
  const ctx = useContext(AuthCtx)
  if(!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
