from fastapi import FastAPI

app = FastAPI(title="EduFlow AI API")

@app.get("/api/health")
def health():
    return {"success": True, "status": "operational"}

@app.get("/api/{path:path}")
def catch_all(path: str):
    return {"success": True, "message": f"API route /{path} — demo uses in-browser store, no live DB needed"}
