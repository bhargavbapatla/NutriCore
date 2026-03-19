from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.api.dependencies import get_user_from_cookie
from app.schemas.profile import QuestionnaireRequest

router = APIRouter()

@router.post("/profile")
async def update_profile(
    request: QuestionnaireRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_user_from_cookie)
):
    try:
        # 1. Standard fields
        current_user.weight = request.weight
        current_user.sleep_hours = request.sleep
        
        # 2. Extract the raw integer from the validated Enum using .value
        current_user.goal = request.goal.value
        current_user.activity_level = request.activity.value
        current_user.meals_per_day = request.meals.value
        
        # 3. Pass the list directly (SQLAlchemy handles the JSON conversion natively)
        current_user.dietary_restrictions = request.restrictions
        
        # 4. CRITICAL: Flip the flag so React lets them into the Dashboard
        current_user.is_questionnaire_complete = True
        
        # Save to DB
        db.commit()
        db.refresh(current_user)
        
        return {
            "message": "Profile updated successfully",
            "user": {
                "id": current_user.id,
                "email": current_user.email,
                # Return this in camelCase so React AuthStore detects it perfectly
                "isQuestionnaireComplete": current_user.is_questionnaire_complete,
                "weight": current_user.weight,
                "goal": current_user.goal,
                "activity_level": current_user.activity_level,
                "sleep_hours": current_user.sleep_hours,
                "meals_per_day": current_user.meals_per_day,
                "dietary_restrictions": current_user.dietary_restrictions
            }
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while updating the profile: {str(e)}"
        )