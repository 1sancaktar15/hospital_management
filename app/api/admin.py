from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models import Patient, Doctor, Appointment
from app.auth import has_role

router = APIRouter()

@router.get("/admin/dashboard")
def get_dashboard_data(db: Session = Depends(get_db), current_user=Depends(has_role("admin"))):
    patient_count = db.query(Patient).count()
    doctor_count = db.query(Doctor).count()
    total_appointments = db.query(Appointment).count()

    # Randevu durumlarına göre sayı al
    appointments_by_status = (
        db.query(Appointment.status, func.count(Appointment.id))
        .group_by(Appointment.status)
        .all()
    )
    status_counts = {status: count for status, count in appointments_by_status}

    # Bugünkü randevuları da al (bugün tarihi için örnek filtre)
    from datetime import date
    today_count = db.query(Appointment).filter(Appointment.date == date.today().isoformat()).count()

    return {
        "total_patients": patient_count,
        "total_doctors": doctor_count,
        "total_appointments": total_appointments,
        "appointments_status": status_counts,
        "today_appointments": today_count,
    }
