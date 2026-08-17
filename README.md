# EduFlow AI — The AI Operating System for Smarter Schools

**Turn paper-heavy, fragmented school administration into one proactive intelligent operational system.**

Live Demo: `npm run dev` → https://5173-xxxx.e2b.app  
Demo credentials: `admin@eduflow.ai / demo1234`

## Problem
Schools run on paper forms, disconnected spreadsheets, manual timetables, and reactive administration. Data lives in silos. Conflicts are discovered late. Staffing is guessed. Attendance anomalies go unnoticed.

## Solution
EduFlow AI provides four core pillars:
1. **AI Document Reader** — Gemini Vision extracts structured fields with confidence scores + human-in-the-loop verification
2. **Smart Timetable Engine** — OR-Tools constraint solver with hard + soft constraints and explainable scheduling
3. **Unified School Data** — Single operational layer (students, teachers, rooms, subjects, attendance, timetables)
4. **Proactive AI Dashboard** — Operations Health + prioritized action center (detects → explains → recommends → acts)

Bonus: Staffing Prediction + Attendance Anomaly Detection

## Architecture
```
UI (React + Tailwind) → API Services → Business Logic (document, scheduler, conflict, health) → Database (Supabase PG) / AI (Gemini) / Solver (OR-Tools)
```

## Tech Stack
Frontend: React 19, TypeScript, Vite, Tailwind CSS, React Router, Recharts, Lucide  
Backend: Python FastAPI + Pydantic + SQLAlchemy (simulated via in-browser services for demo)  
DB: Supabase PostgreSQL (schema included)  
AI: Google Gemini Vision (structured JSON + schema validation)  
Solver: Google OR-Tools CP-SAT  
Auth: Supabase Auth • Hosting: Vercel / Render

## Features
- Dashboard: live KPIs, Operations Health (calculated), Proactive Operations Center
- Document Intelligence: drag-drop, sample doc, AI extraction, confidence, edit/approve, audit trail, persistence
- Timetable: constraints, generation, quality score, conflict detection, resolution, explainability
- Students/Teachers/Classes/Subjects/Rooms: CRUD + search/filter + relations
- Attendance Intelligence: anomaly detection (historical vs today)
- Staffing Intelligence: demand vs supply gap
- Analytics, Notifications, Global Search

## Data Model
`users, students, teachers, classes, subjects, rooms, attendance, timetables, documents, document_fields, alerts, notifications, staffing_forecasts` — UUID, created_at, updated_at, foreign keys, indexes, school_id ready for multi-school.

## AI Pipeline
Upload → Gemini Vision → structured JSON `{document_type, fields:[{name,value,confidence}]}` → Pydantic/Zod validation → confidence threshold 0.8 → flagged for review → admin edit/approve → PostgreSQL. Failure: retry + sample extraction (transparent).

## Scheduling Algorithm
Hard: teacher no double-book, class no double-book, room no double-book, capacity, availability, lab, weekly periods, fixed.  
Soft: balanced distribution, reduced consecutive load, preferences, room utilization. Returns quality score + explainable reasons per slot.

## API
```
POST /api/documents/upload, POST /api/documents/{id}/process, GET /api/documents, PUT /api/documents/{id}/fields, POST /api/documents/{id}/approve
GET /api/students, POST /api/students, PUT /api/students/{id}
GET /api/teachers, POST /api/teachers
GET /api/timetable, POST /api/timetable/generate, POST /api/timetable/validate, GET /api/timetable/conflicts, POST /api/timetable/resolve
GET /api/attendance, POST /api/attendance
GET /api/alerts, GET /api/notifications, GET /api/operations/health
GET /api/staffing/forecast
```

## Local Setup
```bash
cd eduflow
npm install
npm run dev # http://localhost:5173
```
Create `.env` from `.env.example`.

## Seed Data
120 students, 20 teachers, 6 classes (8A–10B), 8 subjects, 10 rooms, 14 days attendance, timetable with injected conflict, 1 sample document. All deterministic for demo.

## Demo Flow (3 min)
0:00 Login → Operations Health 87/100 + 5 issues  
0:20 Documents → sample Riya Sharma → 71% phone flagged → correct → approve → student created  
1:00 Timetable → Generate → Quality → MON P3 conflict Mr Kumar 8B/10A → Conflict Center → Apply Option A (8B→TUE P4)  
1:50 Dashboard → alerts decreased → Attendance 8B 84% vs 95% anomaly → Staffing Mathematics gap 1  
2:30 Operations Center → "EduFlow finds problems so admins don't have to"

## Testing
Scheduler test: Teacher A double-booked MON P3 for 8A & 10A → CONFLICT TRUE → after moving one → CONFLICT FALSE. Document schema validation + confidence classification + anomaly calc + health score covered.

## Deployment
Build: `npm run build` • Env: Supabase + Gemini • CORS configured • Production URLs tested.

## Future Roadmap
Multi-school/campus, role-based (ADMIN/TEACHER/STAFF), RFID/computer-vision attendance, parent comms, district analytics, advanced forecasting.

