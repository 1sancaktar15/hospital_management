  # Doktor ile ilgili API endpointleri

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app import schemas, crud
from app.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[schemas.Doctor])
def read_doctors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_doctors(db, skip=skip, limit=limit)

@router.get("/{doctor_id}", response_model=schemas.Doctor)
def read_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = crud.get_doctor(db, doctor_id=doctor_id)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doctor

@router.post("/", response_model=schemas.Doctor, status_code=status.HTTP_201_CREATED)
def create_doctor(doctor: schemas.DoctorCreate, db: Session = Depends(get_db)):
    return crud.create_doctor(db, doctor=doctor)

@router.put("/{doctor_id}", response_model=schemas.Doctor)
def update_doctor(doctor_id: int, doctor_data: schemas.DoctorCreate, db: Session = Depends(get_db)):
    updated_doctor = crud.update_doctor(db, doctor_id=doctor_id, doctor_data=doctor_data)
    if not updated_doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return updated_doctor

@router.delete("/{doctor_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_doctor(doctor_id: int, db: Session = Depends(get_db)):
    success = crud.delete_doctor(db, doctor_id=doctor_id)
    if not success:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return
