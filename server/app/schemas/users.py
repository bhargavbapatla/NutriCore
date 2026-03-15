from pydantic import BaseModel, Field

class Createuser(BaseModel):
    name: str
    email: str
    password: str = Field(..., min_length=7, max_length=72)