-- EduFlow AI — Supabase PostgreSQL Schema
-- Enable UUID
create extension if not exists "uuid-ossp";

-- Schools (multi-school readiness)
create table schools (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  code text unique not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Users
create table users (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id),
  email text unique not null,
  role text check (role in ('ADMIN','TEACHER','STAFF')) default 'ADMIN',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Classes
create table classes (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id),
  name text not null,
  section text,
  capacity int not null,
  class_teacher_id uuid references users(id),
  created_at timestamptz default now()
);

-- Subjects
create table subjects (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id),
  name text not null,
  code text not null,
  weekly_periods int not null,
  lab_required boolean default false,
  preferred_department text,
  created_at timestamptz default now()
);

-- Rooms
create table rooms (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id),
  name text not null,
  type text check (type in ('Classroom','Computer Lab','Physics Lab','Chemistry Lab','Seminar Hall')),
  capacity int not null,
  equipment jsonb default '[]',
  created_at timestamptz default now()
);

-- Teachers
create table teachers (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id),
  name text not null,
  department text,
  subjects text[] default '{}',
  available_periods text[] default '{}',
  max_weekly_load int default 24,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index idx_teachers_school on teachers(school_id);

-- Students
create table students (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id),
  class_id uuid references classes(id),
  name text not null,
  dob date,
  parent_name text,
  phone text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index idx_students_class on students(class_id);
create index idx_students_school on students(school_id);

-- Documents
create table documents (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id),
  file_name text not null,
  document_type text,
  status text check (status in ('uploaded','processing','extracted','verified','failed')) default 'uploaded',
  created_at timestamptz default now()
);

create table document_fields (
  id uuid primary key default uuid_generate_v4(),
  document_id uuid references documents(id) on delete cascade,
  name text not null,
  value text,
  confidence float check (confidence >=0 and confidence <=1),
  requires_review boolean default false
);
create index idx_doc_fields_doc on document_fields(document_id);

-- Timetables
create table timetables (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id),
  class_id uuid references classes(id),
  day text check (day in ('MON','TUE','WED','THU','FRI')),
  period int check (period between 1 and 6),
  subject_id uuid references subjects(id),
  teacher_id uuid references teachers(id),
  room_id uuid references rooms(id),
  created_at timestamptz default now(),
  unique(teacher_id, day, period),
  unique(class_id, day, period),
  unique(room_id, day, period)
);

-- Attendance
create table attendance (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id),
  student_id uuid references students(id),
  class_id uuid references classes(id),
  date date not null,
  status text check (status in ('present','absent','late')),
  created_at timestamptz default now()
);
create index idx_attendance_date on attendance(date);
create index idx_attendance_class on attendance(class_id);

-- Alerts & Notifications
create table alerts (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id),
  type text,
  severity text check (severity in ('HIGH','MEDIUM','LOW')),
  title text not null,
  description text,
  recommendation text,
  resolved boolean default false,
  created_at timestamptz default now()
);

create table notifications (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id),
  user_id uuid references users(id),
  message text not null,
  read boolean default false,
  link text,
  created_at timestamptz default now()
);

-- Staffing forecasts
create table staffing_forecasts (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id),
  subject_id uuid references subjects(id),
  current_teachers int,
  estimated_required int,
  gap int,
  confidence text,
  created_at timestamptz default now()
);
