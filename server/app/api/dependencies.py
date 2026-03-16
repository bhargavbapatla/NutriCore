from fastapi import Request, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.helper.userHelper import get_current_user

def get_user_from_cookie(request: Request, db: Session = Depends(get_db)):
    cookie_header = request.cookies.get("access_token")
    
    if not cookie_header or not cookie_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated. Please log in."
        )

    actual_token = cookie_header.split(" ")[1]

    user = get_current_user(token=actual_token, db=db)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired. Please log in again."
        )

    return user