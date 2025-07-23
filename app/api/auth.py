# app/api/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from app import schemas, crud, models
from app.database import get_db
from app.auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from app.auth import has_role, has_roles
from app.crud import verify_password

router = APIRouter()

@router.get("/admin/dashboard")
def admin_dashboard(current_user: models.User = Depends(has_role("admin"))):
    # Sadece admin erişebilir
    return {"message": f"Merhaba {current_user.username}, admin paneline hoş geldiniz."}

@router.get("/doctor-panel")
def doctor_panel(current_user: models.User = Depends(has_role("doctor"))):
    # Doktorlar için özel alan
    return {"message": f"Merhaba {current_user.username}, doktor paneline hoş geldiniz."}

@router.get("/common-section")
def common_section(current_user: models.User = Depends(has_roles(["doctor", "admin"]))):
    # Hem doktor, hem admin görebilir
    return {"message": f"Merhaba {current_user.username}, ortak alana eriştiniz."}

@router.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = crud.get_user_by_username(db, user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Kullanıcı adı zaten mevcut")
    return crud.create_user(db=db, user=user)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, username=form_data.username)
    if not user or not crud.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Geçersiz kullanıcı adı veya parola")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "role": user.role}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
