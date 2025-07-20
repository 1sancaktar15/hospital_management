# Pydantic veri doğrulama modelleri

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# Hasta verisi oluşturmak için istek modeli
class PatientCreate(BaseModel):
    name: str
    age: int
    address: Optional[str] = None


# Hasta verisini dışarıya vermek için gösterim modeli
class Patient(BaseModel):
    id: int
    name: str
    age: int
    address: Optional[str] = None

    class Config:
        orm_mode = True  # SQLAlchemy modellerini otomatik dönüştürmek için


# Doktor verisi oluşturmak için istek modeli
class DoctorCreate(BaseModel):
    name: str
    specialty: str


# Doktor verisini dışarıya vermek için gösterim modeli
class Doctor(BaseModel):
    id: int
    name: str
    specialty: str

    class Config:
        orm_mode = True


# Randevu (Appointment) için istek (create) modeli
class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_id: int
    appointment_time: datetime


# Randevuyu dışarıya vermek için model
class Appointment(BaseModel):
    id: int
    patient_id: int
    doctor_id: int
    appointment_time: datetime

    # İsteğe bağlı olarak hasta ve doktor bilgilerini içerebiliriz
    # Patient ve Doctor modellerini kullanarak ilişki göstermek isterseniz:
    # patient: Patient
    # doctor: Doctor

    class Config:
        orm_mode = True
