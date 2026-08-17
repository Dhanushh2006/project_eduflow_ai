export type Severity = 'HIGH' | 'MEDIUM' | 'LOW'
export type AlertType = 'timetable' | 'document' | 'attendance' | 'staffing' | 'room'

export interface Student {
  id: string
  name: string
  dob: string
  classId: string
  section: string
  className: string
  parentName: string
  phone: string
  status: 'active' | 'inactive'
  createdAt: string
}

export interface Teacher {
  id: string
  name: string
  department: string
  subjects: string[]
  availablePeriods: string[] // e.g. "MON-P1"
  maxWeeklyLoad: number
  workload: number
  status: 'active' | 'inactive'
}

export interface ClassRoom {
  id: string
  name: string // 8A
  section: string
  studentCount: number
  capacity: number
  requiredSubjects: string[]
  classTeacherId?: string
}

export interface Subject {
  id: string
  name: string
  code: string
  weeklyPeriods: number
  labRequired: boolean
  preferredDepartment: string
}

export interface Room {
  id: string
  name: string
  type: 'Classroom'|'Computer Lab'|'Physics Lab'|'Chemistry Lab'|'Seminar Hall'
  capacity: number
  equipment: string[]
  availability: string
}

export interface DocumentField {
  name: string
  label: string
  value: string
  confidence: number
  requiresReview: boolean
}

export interface Document {
  id: string
  fileName: string
  type: string
  status: 'uploaded'|'processing'|'extracted'|'verified'|'failed'
  fields: DocumentField[]
  createdAt: string
  audit: { time: string; action: string }[]
}

export interface TimetableEntry {
  id: string
  classId: string
  className: string
  day: string // MON, TUE...
  period: number // 1-6
  subject: string
  teacherId: string
  teacherName: string
  room: string
  roomId: string
}

export interface Conflict {
  id: string
  type: 'Teacher Conflict'|'Class Conflict'|'Room Conflict'|'Capacity Conflict'|'Availability Conflict'|'Lab Conflict'
  severity: Severity
  title: string
  description: string
  constraint: string
  involved: string[]
  suggested: { label: string; impact: string; quality: number; action: string }[]
}

export interface Alert {
  id: string
  type: AlertType
  severity: Severity
  title: string
  description: string
  recommendation: string
  timestamp: string
  actionLabel: string
  link: string
  resolved: boolean
}

export interface AttendanceRecord {
  id: string
  studentId: string
  className: string
  date: string
  status: 'present'|'absent'|'late'
}

export interface Notification {
  id: string
  message: string
  time: string
  read: boolean
  link: string
}
