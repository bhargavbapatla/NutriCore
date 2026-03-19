from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime
from app.models import GoalType, ActivityLevel, MealPattern 

class Createuser(BaseModel):
    name: str
    email: str
    password: str = Field(..., min_length=7, max_length=72)

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    is_questionnaire_complete: bool
    
    # These are Optional because a brand new user hasn't filled them out yet
    age: Optional[int] = None
    weight: Optional[float] = None
    sleep_hours: Optional[float] = None
    goal: Optional[GoalType] = None
    activity_level: Optional[ActivityLevel] = None
    meals_per_day: Optional[MealPattern] = None
    dietary_restrictions: Optional[List[int]] = []
    created_at: datetime

    # This is crucial! It tells Pydantic to read the SQLAlchemy ORM model directly
    model_config = ConfigDict(from_attributes=True)

class UserResponseWrapper(BaseModel):
    user: UserResponse