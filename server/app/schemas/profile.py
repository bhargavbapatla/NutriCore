from pydantic import BaseModel, Field
from typing import List
from app.models import GoalType, ActivityLevel, MealPattern

class QuestionnaireRequest(BaseModel):
    # Field validation ensures the number makes biological sense
    weight: float = Field(..., gt=20, lt=300, description="Weight in kg, must be between 20 and 300")
    sleep: int = Field(..., ge=0, le=24, description="Hours of sleep, max 24")
    
    # Enums automatically validate that the number is exactly 0, 1, 2, or 3
    goal: GoalType
    activity: ActivityLevel
    meals: MealPattern
    
    # Ensures it's a list (can be empty [] if they selected 'None')
    restrictions: List[int] = Field(default_factory=list)