import React from 'react'
import { TeacherDashboard as Base } from '@/Page/MpoTransferDemo'
import TeacherInfo from './TeacherInfo'

export default function Dashboard(){
  return (<div className='space-y-4'><Base/><TeacherInfo/></div>)
}
