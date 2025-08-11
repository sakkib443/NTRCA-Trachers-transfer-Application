import React from 'react'
export function Badge({ children, variant='outline', className='' }) {
  const v = variant === 'secondary' ? 'badge bg-slate-100' : variant === 'destructive' ? 'badge border-red-300 text-red-700' : variant === 'default' ? 'badge bg-slate-900 text-white border-slate-900' : 'badge'
  return <span className={`${v} ${className}`}>{children}</span>
}
