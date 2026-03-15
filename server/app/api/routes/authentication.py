from fastapi import APIRouter, HTTPException, status
from app.schemas.users import Createuser
from app.helper.userHelper import check_email_is_taken, create_user, create_access_token
from app.database import get_db
from sqlalchemy.orm import Session
from fastapi import Depends
from fastapi.responses import Response

router = APIRouter()

@router.post("/signup")
async def register(request: Createuser, response: Response, db: Session = Depends(get_db)):
    isUserExist = await check_email_is_taken(request.email, db)
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
        return {"message": "User created successfully", "user": user}
