from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from app.api.dependencies import get_user_from_cookie
from app.services.ai_service import stream_dashboard_assessment
from app import models

router = APIRouter()


@router.get("/dashboard/init")
async def get_dashboard_init(current_user: models.User = Depends(get_user_from_cookie)):
    if not current_user.is_questionnaire_complete:
        async def _incomplete():
            yield "Please complete your onboarding questionnaire to generate your personalised plan."
        return StreamingResponse(_incomplete(), media_type="text/plain; charset=utf-8")

    return StreamingResponse(
        stream_dashboard_assessment(current_user),
        media_type="text/plain; charset=utf-8",
    )
