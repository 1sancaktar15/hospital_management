from pydantic import BaseModel

class PatientCreate(BaseModel):
    name: str
    gender: str
    birth_date: str
    age: int
    phone: str
    email: str

class Patient(BaseModel):
    id: int
    name: str
    gender: str
    birth_date: str
    age: int
    phone: str
    email: str
    class Config:
        orm_mode = True

class DoctorCreate(BaseModel):
    name: str
    branch: str
    phone: str
    email: str

class Doctor(BaseModel):
    id: int
    name: str
    branch: str
    phone: str
    email: str
    class Config:
        orm_mode = True

class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_id: int
    date: str
    status: str

class Appointment(BaseModel):
    id: int
    patient_id: int
    doctor_id: int
    date: str
    status: str
    class Config:
        orm_mode = True
