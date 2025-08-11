import React from 'react'
export function Button({ children, variant='primary', size='sm', className='', ...props }) {
  const v = variant === 'outline' ? 'btn btn-outline' : variant === 'destructive' ? 'btn bg-red-600 text-white hover:bg-red-700' : 'btn btn-primary'
  const s = size === 'icon' ? 'p-2' : size === 'sm' ? '' : 'px-4 py-2'
  return <button className={`${v} ${s} ${className}`} {...props}>{children}</button>
}
