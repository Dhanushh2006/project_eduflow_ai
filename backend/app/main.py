from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import documents, students, teachers, timetable, attendance, operations, staffing

app = FastAPI(title="EduFlow AI API", version="1.0.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

app.include_router(documents.router, prefix="/api/documents", tags=["documents"])
app.include_router(students.router, prefix="/api/students", tags=["students"])
app.include_router(teachers.router, prefix="/api/teachers", tags=["teachers"])
app.include_router(timetable.router, prefix="/api/timetable", tags=["timetable"])
app.include_router(attendance.router, prefix="/api/attendance", tags=["attendance"])
app.include_router(operations.router, prefix="/api/operations", tags=["operations"])
app.include_router(staffing.router, prefix="/api/staffing", tags=["staffing"])

@app.get("/health")
def health():
    return {"success": True, "status": "operational", "version": "1.0.0"}
