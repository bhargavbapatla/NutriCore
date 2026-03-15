from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app import models, schemas
from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import jwt
from fastapi import HTTPException, status
from dotenv import load_dotenv
import os
load_dotenv()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def check_email_is_taken(email: str, db: Session):
    return db.query(models.User).filter(models.User.email == email).first()

async def create_user(request: schemas.Createuser, db: Session):
    hashed_password = pwd_context.hash(request.password)
    new_user = models.User(
        name=request.name,
        email=request.email,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def create_access_token(data: dict):
    to_encode = data.copy()
    
    # Set the exact time the token should self-destruct
    expire = datetime.now(timezone.utc) + timedelta(minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")))
    to_encode.update({"exp": expire})
    
    # Mathematically sign the token using your secret key
    encoded_jwt = jwt.encode(to_encode, os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM"))
    return encoded_jwt