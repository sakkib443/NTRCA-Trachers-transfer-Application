import React from 'react'
export function Progress({ value=0, className='' }) {
  return <div className={`progress ${className}`}><div className="progress-bar" style={{ width: `${value}%` }} /></div>
}
