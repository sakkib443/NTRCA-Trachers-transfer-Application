import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  User, Phone, Mail, Calendar, School, BadgeCheck
} from 'lucide-react'

const demoTeacher = {
  fullName: 'Sadia Akter',
  fatherName: 'Md. Abdul Karim',
  motherName: 'Rokeya Begum',
  gender: 'Female',
  dateOfBirth: '1992-05-14',
  photoUrl: '',
  nidNumber: '1992**********',
  indexNumber: 'IDX-123456',
  registrationNumber: 'REG-987654',
  mpoEnrollmentDate: '2022-03-15',
  joinDate: '2021-01-10',
  currentInstituteId: 'Dhaka Polytechnic Institute',
  subjectId: 'English',
  designationId: 'Lectarar',
  mobile: '017********',
  email: 'sadia.akter@example.com',
  batchNumber: '12',
  circularYear: '2020',
  circularReferenceNo: '45/NTRCA/2020',
  appointmentDate: '2021-01-10',
  mpoApprovalDate: '2022-03-15',
  isVerified: true
}

function SectionTitle({ title, subtitle, icon: Icon, color='indigo' }) {
  const bg = {
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    sky: 'bg-sky-50 border-sky-200 text-sky-700',
    violet: 'bg-violet-50 border-violet-200 text-violet-700',
    rose: 'bg-rose-50 border-rose-200 text-rose-700',
  }[color]
  return (
    <div className="mb-3">
      <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-xl border ${bg}`}>
        {Icon && <Icon className="h-4 w-4" />}
        <span className="text-sm font-semibold">{title}</span>
      </div>
      {subtitle && <div className="text-xs text-slate-500 mt-1">{subtitle}</div>}
    </div>
  )
}

function Divider() {
  return <div className="border-t my-3" />
}

function Field({ label, value, tone='slate' }) {
  const toneMap = {
    slate: 'bg-slate-50 border-slate-200',
    indigo: 'bg-indigo-50 border-indigo-200',
    amber: 'bg-amber-50 border-amber-200',
    emerald: 'bg-emerald-50 border-emerald-200',
    sky: 'bg-sky-50 border-sky-200',
    violet: 'bg-violet-50 border-violet-200',
    rose: 'bg-rose-50 border-rose-200',
  }[tone]
  return (
    <div className="space-y-1.5">
      <div className="text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className={`text-sm font-medium rounded-xl px-3 py-2 border ${toneMap}`}>
        {value || '-'}
      </div>
    </div>
  )
}

export default function TeacherInfo() {
  const t = demoTeacher

  return (
    <Card className="overflow-hidden">
      {/* Vibrant Header */}
      <div className="bg-gradient-to-r from-indigo-100 via-sky-50 to-rose-50 border-b">
        <div className="max-w-7xl px-4 py-5 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl border bg-white grid place-items-center text-slate-400 shadow-sm">
                {t.photoUrl ? (
                  <img src={t.photoUrl} alt="Teacher" className="h-16 w-16 rounded-2xl object-cover" />
                ) : (
                  <User className="h-7 w-7" />
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl md:text-2xl font-semibold">{t.fullName}</h2>
                  <Badge variant={t.isVerified ? 'default' : 'outline'} className="gap-1">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {t.isVerified ? 'Verified' : 'Not Verified'}
                  </Badge>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-700">
                  <span className="inline-flex items-center gap-1.5"><Phone className="h-4 w-4" /> {t.mobile}</span>
                  <span className="inline-flex items-center gap-1.5"><Mail className="h-4 w-4" /> {t.email}</span>
                </div>
              </div>
            </div>

            {/* Colorful Chips */}
            <div className="flex flex-wrap gap-2">
              <span className="badge bg-indigo-50 border-indigo-200 text-indigo-700">Subject: {t.subjectId}</span>
              <span className="badge bg-rose-50 border-rose-200 text-rose-700">Designation: {t.designationId}</span>
              <span className="badge bg-sky-50 border-sky-200 text-sky-700 inline-flex items-center gap-1">
                <School className="h-3.5 w-3.5" /> {t.currentInstituteId}
              </span>
            </div>
          </div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle>Teacher Information</CardTitle>
        <CardDescription>শিক্ষকের মৌলিক, রেফারেন্স ও ইনস্টিটিউট সম্পর্কিত তথ্য (রিড-অনলি)</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Personal */}
        <section>
          <SectionTitle title="Personal" subtitle="শিক্ষকের মৌলিক তথ্য" icon={User} color="indigo" />
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="পূর্ণ নাম (fullName)" value={t.fullName} tone="indigo" />
            <Field label="পিতার নাম (fatherName)" value={t.fatherName} />
            <Field label="মাতার নাম (motherName)" value={t.motherName} />
            <Field label="লিঙ্গ (gender)" value={t.gender} />
            <Field label="জন্ম তারিখ (dateOfBirth)" value={t.dateOfBirth} />
          </div>
        </section>

        <Divider />

        {/* National / NTRCA */}
        <section>
          <SectionTitle title="National / NTRCA" subtitle="পরিচয়পত্র ও NTRCA রেফারেন্স" icon={BadgeCheck} color="amber" />
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="জাতীয় পরিচয়পত্র (nidNumber)" value={t.nidNumber} tone="amber" />
            <Field label="NTRCA Index (indexNumber)" value={t.indexNumber} />
            <Field label="NTRCA Registration (registrationNumber)" value={t.registrationNumber} />
          </div>
        </section>

        <Divider />

        {/* MPO & Job */}
        <section>
          <SectionTitle title="MPO & Job Timeline" subtitle="MPO তে যুক্ত হওয়া ও জয়েন করার তারিখ" icon={Calendar} color="emerald" />
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="MPO Enrollment (mpoEnrollmentDate)" value={t.mpoEnrollmentDate} tone="emerald" />
            <Field label="Joining Date (joinDate)" value={t.joinDate} />
          </div>
        </section>

        <Divider />

        {/* Institute & Position */}
        <section>
          <SectionTitle title="Institute & Position" subtitle="বর্তমান প্রতিষ্ঠান, বিষয়, পদবি" icon={School} color="sky" />
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Current Institute (currentInstituteId)" value={t.currentInstituteId} tone="sky" />
            <Field label="Subject (subjectId)" value={t.subjectId} />
            <Field label="Designation (designationId)" value={t.designationId} />
          </div>
        </section>

        <Divider />

        {/* Contact */}
        <section>
          <SectionTitle title="Contact" subtitle="মোবাইল ও ইমেইল" icon={Mail} color="violet" />
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="মোবাইল (mobile)" value={t.mobile} tone="violet" />
            <Field label="ইমেইল (email)" value={t.email} />
          </div>
        </section>

        <Divider />

        {/* Circular & Appointment */}
        <section>
          <SectionTitle title="Circular & Appointment" subtitle="নিয়োগ বিজ্ঞপ্তি ও তারিখসমূহ" icon={Calendar} color="rose" />
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="NTRCA Batch (batchNumber)" value={t.batchNumber} tone="rose" />
            <Field label="Circular Year (circularYear)" value={t.circularYear} />
            <Field label="Circular Ref No (circularReferenceNo)" value={t.circularReferenceNo} />
            <Field label="Appointment Date (appointmentDate)" value={t.appointmentDate} />
            <Field label="MPO Approval Date (mpoApprovalDate)" value={t.mpoApprovalDate} />
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
