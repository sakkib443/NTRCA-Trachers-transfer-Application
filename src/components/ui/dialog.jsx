import React, { useState } from 'react'
export function Dialog({ children }) { return <>{children}</> }
export function DialogTrigger({ children, onClick }) { return <div onClick={onClick}>{children}</div> }
export function DialogContent({ children }) { return <div className="fixed inset-0 grid place-items-center bg-black/30 p-4"><div className="card max-w-lg w-full">{children}</div></div> }
export function DialogHeader({ children }) { return <div className="border-b px-4 py-3">{children}</div> }
export function DialogTitle({ children }) { return <h3 className="text-base font-semibold">{children}</h3> }
export function DialogDescription({ children }) { return <p className="text-sm text-slate-500 mt-1">{children}</p> }
export function DialogFooter({ children }) { return <div className="px-4 py-3 border-t flex justify-end gap-2">{children}</div> }
