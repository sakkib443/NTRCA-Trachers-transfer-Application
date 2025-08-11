import React from 'react'
import { ApplicationsTable } from '@/Page/MpoTransferDemo'
import { useState } from 'react'
import { sampleApps } from '@/Page/MpoTransferDemo.jsx'
export default function Applications(){
  const [openId, setOpenId] = useState(null)
  return <ApplicationsTable items={sampleApps.filter(a => a.teacherName.includes('Sadia'))} onOpen={setOpenId} />
}
