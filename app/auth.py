from datetime import datetime, timedelta
from typing import Optional
from jose import jwt, JWTError
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from app.database import get_db
from sqlalchemy.orm import Session
from app import crud, models

SECRET_KEY = "your-very-secret-key"  # Bunu güçlü random anahtarla değiştir!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def has_role(role: str):
    def role_checker(current_user: models.User = Depends(get_current_active_user)):
        if current_user.role != role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Bu işlem için '{role}' rolü gereklidir."
            )
        return current_user
    return role_checker

def has_roles(roles: list[str]):
    def roles_checker(current_user: models.User = Depends(get_current_active_user)):
        if current_user.role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Bu işlem için şu rollerden biri gereklidir: {', '.join(roles)}."
            )
        return current_user
    return roles_checker

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        role: str = payload.get("role")
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username=username)
    if user is None:
        raise credentials_exception
    return user

def get_current_active_user(current_user: models.User = Depends(get_current_user)):
    return current_user
