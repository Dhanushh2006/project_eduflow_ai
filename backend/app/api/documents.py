from fastapi import APIRouter
router = APIRouter()
@router.get("/")
def list_docs(): return {"success": True, "data": []}
