from pydantic import BaseModel, EmailStr
from typing import Optional


class UserBase(BaseModel):
    username: str
    email: EmailStr
    role: str = "patient"  # Roller: patient, doctor, admin


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class PatientCreate(BaseModel):
    name: str
    gender: Optional[str] = None  # opsiyonel olabilir
    birth_date: Optional[str] = None
    age: Optional[int] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None


class Patient(BaseModel):
    id: int
    name: str
    gender: Optional[str] = None
    birth_date: Optional[str] = None
    age: Optional[int] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None

    class Config:
        orm_mode = True


class DoctorCreate(BaseModel):
    name: str
    branch: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None


class Doctor(BaseModel):
    id: int
    name: str
    branch: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None

    class Config:
        orm_mode = True


class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_id: int
    date: str  # ISO string veya datetime string
    status: str


class Appointment(BaseModel):
    id: int
    patient_id: int
    doctor_id: int
    date: str
    status: str

    class Config:
        orm_mode = True
