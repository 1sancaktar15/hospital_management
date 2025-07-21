from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    date = Column(String, nullable=False)  # veya DateTime (ama fake veride isoformat string!)
    status = Column(String, nullable=False)

    patient = relationship("Patient", back_populates="appointments")
    doctor = relationship("Doctor", back_populates="appointments")

class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    gender = Column(String)
    birth_date = Column(String)
    age = Column(Integer)
    phone = Column(String)
    email = Column(String)

    appointments = relationship("Appointment", back_populates="patient", cascade="all, delete")

class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    branch = Column(String)
    phone = Column(String)
    email = Column(String)

    appointments = relationship("Appointment", back_populates="doctor", cascade="all, delete")
