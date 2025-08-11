import React, { useState } from 'react'
export function Switch({ defaultChecked=false, onCheckedChange }) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <button
      onClick={() => { const v = !checked; setChecked(v); onCheckedChange && onCheckedChange(v) }}
      className="switch"
      aria-checked={checked}
      role="switch"
    >
      <span className="switch-dot" style={{ transform: `translateX(${checked ? '20px' : '1px'})`}} />
    </button>
  )
}
