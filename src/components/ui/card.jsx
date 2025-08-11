import React from 'react'
export function Card({ children, className='' }) { return <div className={`card ${className}`}>{children}</div> }
export function CardHeader({ children }) { return <div className="border-b px-4 py-3">{children}</div> }
export function CardTitle({ children, className='' }) { return <h3 className={`text-base font-semibold ${className}`}>{children}</h3> }
export function CardDescription({ children }) { return <p className="text-sm text-slate-500 mt-1">{children}</p> }
export function CardContent({ children, className='' }) { return <div className={`px-4 pb-4 ${className}`}>{children}</div> }
