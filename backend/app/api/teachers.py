from fastapi import APIRouter
router = APIRouter()
@router.get("/")
def list_items(): return {"success": True, "data": []}
