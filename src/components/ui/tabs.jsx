import React, { useState } from 'react'
export function Tabs({ defaultValue, children }) {
  const [value, setValue] = useState(defaultValue)
  return React.Children.map(children, child => React.cloneElement(child, { value, setValue }))
}
export function TabsList({ children, value, setValue }) {
  return <div className="flex gap-2 mb-3">{React.Children.map(children, c => React.cloneElement(c, { value, setValue }))}</div>
}
export function TabsTrigger({ value:val, children, value, setValue }) {
  const active = value === val
  return <button className={`tab-btn ${active ? 'tab-btn-active' : ''}`} onClick={() => setValue(val)}>{children}</button>
}
export function TabsContent({ value:val, children, value }) {
  return value === val ? <div>{children}</div> : null
}
