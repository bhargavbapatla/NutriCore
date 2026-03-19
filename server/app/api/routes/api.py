from app.api.routes import authentication, profile
from fastapi import APIRouter

router = APIRouter()

router.include_router(authentication.router, prefix="/auth", tags=["auth"])
router.include_router(profile.router, prefix="", tags=["profile"])