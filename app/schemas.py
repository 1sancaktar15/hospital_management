from pydantic import BaseModel,EmailStr

class UserBase(BaseModel):
    username: str
    email: EmailStr
    role: str = "patient"

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
