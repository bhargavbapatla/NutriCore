
from app.api.routes import authentication
from fastapi import APIRouter

router = APIRouter()

router.include_router(authentication.router, prefix="/auth", tags=["auth"])