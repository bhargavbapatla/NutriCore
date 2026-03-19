import enum
from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, JSON, Enum
from sqlalchemy.sql import func
from app.database import Base 

# ─── Define your ENUMs up top ───────────────────────────────────────

class GoalType(enum.IntEnum):
    LOSE_WEIGHT = 0
    BUILD_MUSCLE = 1
    MAINTAIN = 2
    IMPROVE_HEALTH = 3

class ActivityLevel(enum.IntEnum):
    SEDENTARY = 0
    LIGHTLY_ACTIVE = 1
    MODERATELY_ACTIVE = 2
    VERY_ACTIVE = 3

class MealPattern(enum.IntEnum):
    TWO_MEALS = 0
    THREE_MEALS = 1
    FOUR_TO_FIVE = 2
    INTERMITTENT_FASTING = 3


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    
    is_questionnaire_complete = Column(Boolean, default=False)
    age = Column(Integer, nullable=True)
    weight = Column(Float, nullable=True)
    sleep_hours = Column(Float, nullable=True)     
    goal = Column(Integer, nullable=True)
    activity_level = Column(Integer, nullable=True) 
    meals_per_day = Column(Integer, nullable=True)
    dietary_restrictions = Column(JSON, nullable=True, default=[])
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())