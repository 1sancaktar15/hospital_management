# Veritabanı işlemleri (Create, Read, Update, Delete)

from sqlalchemy.orm import Session
from app import models, schemas


# Hasta CRUD işlemleri
def get_patient(db: Session, patient_id: int):
    return db.query(models.Patient).filter(models.Patient.id == patient_id).first()


def get_patients(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Patient).offset(skip).limit(limit).all()


def create_patient(db: Session, patient: schemas.PatientCreate):
    db_patient = models.Patient(
        name=patient.name,
        age=patient.age,
        address=patient.address
    )
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient


def update_patient(db: Session, patient_id: int, patient_data: schemas.PatientCreate):
    db_patient = get_patient(db, patient_id)
    if db_patient:
        db_patient.name = patient_data.name
        db_patient.age = patient_data.age
        db_patient.address = patient_data.address
        db.commit()
        db.refresh(db_patient)
        return db_patient
    return None


def delete_patient(db: Session, patient_id: int):
    db_patient = get_patient(db, patient_id)
    if db_patient:
        db.delete(db_patient)
        db.commit()
        return True
    return False


# Doktor CRUD işlemleri
def get_doctor(db: Session, doctor_id: int):
    return db.query(models.Doctor).filter(models.Doctor.id == doctor_id).first()


def get_doctors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Doctor).offset(skip).limit(limit).all()


def create_doctor(db: Session, doctor: schemas.DoctorCreate):
    db_doctor = models.Doctor(name=doctor.name, specialty=doctor.specialty)
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor


def update_doctor(db: Session, doctor_id: int, doctor_data: schemas.DoctorCreate):
    db_doctor = get_doctor(db, doctor_id)
    if db_doctor:
        db_doctor.name = doctor_data.name
        db_doctor.specialty = doctor_data.specialty
        db.commit()
        db.refresh(db_doctor)
        return db_doctor
    return None


def delete_doctor(db: Session, doctor_id: int):
    db_doctor = get_doctor(db, doctor_id)
    if db_doctor:
        db.delete(db_doctor)
        db.commit()
        return True
    return False


# Randevu (Appointment) CRUD işlemleri
def get_appointment(db: Session, appointment_id: int):
    return db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()


def get_appointments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Appointment).offset(skip).limit(limit).all()


def create_appointment(db: Session, appointment: schemas.AppointmentCreate):
    db_appointment = models.Appointment(
        patient_id=appointment.patient_id,
        doctor_id=appointment.doctor_id,
        appointment_time=appointment.appointment_time
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment


def update_appointment(db: Session, appointment_id: int, appointment_data: schemas.AppointmentCreate):
    db_appointment = get_appointment(db, appointment_id)
    if db_appointment:
        db_appointment.patient_id = appointment_data.patient_id
        db_appointment.doctor_id = appointment_data.doctor_id
        db_appointment.appointment_time = appointment_data.appointment_time
        db.commit()
        db.refresh(db_appointment)
        return db_appointment
    return None


def delete_appointment(db: Session, appointment_id: int):
    db_appointment = get_appointment(db, appointment_id)
    if db_appointment:
        db.delete(db_appointment)
        db.commit()
        return True
    return False
