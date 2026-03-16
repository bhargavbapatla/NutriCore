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

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

async def get_user_by_email(email: str, db: Session):
    return db.query(models.User).filter(models.User.email == email).first()

def get_current_user(token: str, db: Session):
    try:
        payload = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=[os.getenv("ALGORITHM")])
        user_id: str = payload.get("sub")
        if user_id is None:
            return None
        return db.query(models.User).filter(models.User.id == int(user_id)).first()
    except Exception:
        return None