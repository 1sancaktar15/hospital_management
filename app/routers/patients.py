# Hasta ile ilgili API endpointleri
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import SessionLocal

router = APIRouter()

# Dependency: her istekte veritabanı oturumu açıp kapatan fonksiyon
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Hastaları listele - TÜM kayıtları getirecek şekilde güncellendi
@router.get("/", response_model=List[schemas.Patient])
def read_patients(skip: int = 0, limit: int = 10000, db: Session = Depends(get_db)):
    """
    Tüm hastaları listeler
    - skip: Atlanacak kayıt sayısı (pagination için)
    - limit: Getirilecek maksimum kayıt sayısı (10000 olarak ayarlandı)
    """
    patients = crud.get_patients(db, skip=skip, limit=limit)
    return patients

# Belirli bir hastayı göster
@router.get("/{patient_id}", response_model=schemas.Patient)
def read_patient(patient_id: int, db: Session = Depends(get_db)):
    patient = crud.get_patient(db, patient_id=patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

# Yeni hasta oluştur
@router.post("/", response_model=schemas.Patient, status_code=status.HTTP_201_CREATED)
def create_patient(patient: schemas.PatientCreate, db: Session = Depends(get_db)):
    return crud.create_patient(db, patient=patient)

# Hasta güncelle
@router.put("/{patient_id}", response_model=schemas.Patient)
def update_patient(patient_id: int, patient_data: schemas.PatientCreate, db: Session = Depends(get_db)):
    updated_patient = crud.update_patient(db, patient_id=patient_id, patient_data=patient_data)
    if not updated_patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return updated_patient

# Hasta sil
@router.delete("/{patient_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_patient(patient_id: int, db: Session = Depends(get_db)):
    success = crud.delete_patient(db, patient_id=patient_id)
    if not success:
        raise HTTPException(status_code=404, detail="Patient not found")
    return