from fastapi import APIRouter, HTTPException, status
from app.schemas.users import Createuser, UserLogin
from app.helper.userHelper import get_user_by_email, create_user, create_access_token, verify_password, get_current_user
from app.database import get_db
from sqlalchemy.orm import Session
from fastapi import Depends, Request
from fastapi.responses import Response
from app import models
from app.api.dependencies import get_user_from_cookie
from app.schemas.users import UserResponseWrapper
router = APIRouter()

@router.post("/signup")
async def register(request: Createuser, response: Response, db: Session = Depends(get_db)):
    isUserExist = await get_user_by_email(request.email, db)
    if isUserExist:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered. Please log in."
        )
    else:
        user = await create_user(request, db)
        access_token = create_access_token(data={"sub": str(user.id)})
        response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=7 * 24 * 60 * 60
    )
        return {"message": "Account created successfully", "user": user}

@router.post("/login")
async def login(request: UserLogin, response: Response, db: Session = Depends(get_db)):
    
    user = await get_user_by_email(request.email, db)
    
    if not user or not verify_password(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )
        
    access_token = create_access_token(data={"sub": str(user.id)})
    
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=7 * 24 * 60 * 60
    )
    
    return {
        "message": "Login successful!", 
        "user": user
    }

@router.get("/me", response_model=UserResponseWrapper)
async def verify_user(current_user: models.User = Depends(get_user_from_cookie)):
    return {
        "user": current_user
    }

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", httponly=True, secure=False, samesite="lax")
    return {"message": "Logout successful"}
