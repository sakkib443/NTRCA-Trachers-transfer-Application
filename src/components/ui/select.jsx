import React from 'react'
export function Select({ value, onValueChange, children }) {
  return <div className="relative">{children}</div>
}
export function SelectTrigger({ children, className='', ...props }) {
  return <div className={`input flex items-center justify-between cursor-pointer ${className}`} {...props}>{children}</div>
}
export function SelectValue({ placeholder, value }) { return <span>{value || placeholder || 'Select'}</span> }
export function SelectContent({ children }) { return <div className="mt-1 border rounded-xl bg-white">{children}</div> }
export function SelectItem({ value, children, onClick }) { return <div onClick={() => onClick && onClick(value)} className="px-3 py-2 hover:bg-slate-50 cursor-pointer">{children}</div> }
