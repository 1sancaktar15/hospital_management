import os
import json
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models, schemas, crud


def load_initial_data():
    db: Session = SessionLocal()

    # JSON dosya yolları
    base_path = os.path.join(os.path.dirname(__file__), "scripts")
    with open(os.path.join(base_path, "patients.json"), encoding="utf-8") as f:
        patients = json.load(f)
    with open(os.path.join(base_path, "doctors.json"), encoding="utf-8") as f:
        doctors = json.load(f)
    with open(os.path.join(base_path, "appointments.json"), encoding="utf-8") as f:
        appointments = json.load(f)

    # Eğer zaten 100'den fazla hasta varsa yüklemeyi atla
    patient_count = db.query(models.Patient).count()
    if patient_count > 100:
        print(f"Zaten yeterince ({patient_count}) hasta var, yükleme atlandı.")
        db.close()
        return

    try:
        # Hastalar
        for p in patients:
            obj = schemas.PatientCreate(
                name=p["name"],
                gender=p["gender"],
                birth_date=p["birth_date"],
                age=p["age"],
                phone=p["phone"],
                email=p["email"]
            )
            crud.create_patient(db, obj)

        # Doktorlar
        for d in doctors:
            obj = schemas.DoctorCreate(
                name=d["name"],
                branch=d["branch"],
                phone=d["phone"],
                email=d["email"]
            )
            crud.create_doctor(db, obj)

        # Randevular
        for a in appointments:
            obj = schemas.AppointmentCreate(
                patient_id=a["patient_id"],
                doctor_id=a["doctor_id"],
                date=a["date"],
                status=a["status"]
            )
            crud.create_appointment(db, obj)

        # Buradaki commit isteğe bağlı, çünkü create_... fonksiyonlarında zaten commit var fakat sorun çıkarmaz.
        db.commit()
        print("Sahte veriler başarıyla yüklendi.")

    except Exception as e:
        print("Veri yükleme sırasında hata oluştu:", e)
        db.rollback()

    finally:
        db.commit()
        print("Toplam hasta sayısı:", db.query(models.Patient).count())
        db.close()
