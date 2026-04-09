from app.api.routes import authentication, profile, dashboard
from fastapi import APIRouter

router = APIRouter()

router.include_router(authentication.router, prefix="/auth", tags=["auth"])
router.include_router(profile.router, prefix="", tags=["profile"])
router.include_router(dashboard.router, prefix="", tags=["dashboard"])