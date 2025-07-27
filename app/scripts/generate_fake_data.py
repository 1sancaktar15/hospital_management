# hospital_management/app/scripts/generate_fake_data.py
from faker import Faker
import random
import json
from datetime import datetime, timedelta, date

fake = Faker('tr_TR')

def generate_patients(n=100):
    patients = []
    for i in range(1, n+1):
        birth_date = fake.date_of_birth(minimum_age=0, maximum_age=90)
        age = (date.today() - birth_date).days // 365
        patients.append({
            "id": i,
            "name": fake.name(),
            "gender": random.choice(["Kadın", "Erkek"]),
            "birth_date": birth_date.isoformat(),
            "age": age,
            "phone": fake.phone_number(),
            "email": fake.email(),
        })
    return patients

def generate_doctors(n=20):
    branches = ["Kardiyoloji", "Dahiliye", "Göz", "Ortopedi", "Pediatri", "Nöroloji", "Cildiye", "KBB"]
    doctors_data = []
    for i in range(1, n + 1):
        doctors_data.append({
            "id": i,
            "name": fake.name(),
            "branch": random.choice(branches),
            "phone": fake.phone_number(),
            "email": fake.email()
        })
    return doctors_data

def generate_appointments(patients, doctors, n=200):
    appointments_data = []
    for i in range(1, n + 1):
        appointment_date = fake.date_time_this_year()
        # Randevu durumları gerçekçi bir şekilde belirlenebilir
        status = random.choice(["Tamamlandı", "Beklemede", "İptal"])
        if appointment_date > datetime.now():
            status = "Beklemede" # Gelecekteki randevular beklemede olsun

        appointments_data.append({
            "id": i,
            "patient_id": random.choice(patients)["id"],
            "doctor_id": random.choice(doctors)["id"],
            "date": appointment_date.isoformat(),
            "status": status
        })
    return appointments_data

# Verileri oluştur
patients = generate_patients()
doctors = generate_doctors()
appointments = generate_appointments(patients, doctors)

# Verileri kaydedeceğimiz yer: app klasörü içinde "data" adında bir klasör oluşturalım
# Eğer "data" klasörü yoksa, bu scriptin çalışacağı dizine göre bir yol belirlemeliyiz.
# Daha iyi bir yaklaşım: verileri doğrudan veritabanına yüklemek.
# Şimdilik, script'in çalıştığı dizine kaydedelim ve sonra manuel olarak veya bir script ile DB'ye yükleriz.

# Script'in çalıştığı dizin "app/scripts" olduğu için JSON dosyalarını buraya kaydedelim
# Daha sonra bu dosyaları DB'ye yükleyecek bir fonksiyon yazacağız.
with open("patients.json", "w", encoding="utf-8") as f:
    json.dump(patients, f, ensure_ascii=False, indent=2)
with open("doctors.json", "w", encoding="utf-8") as f:
    json.dump(doctors, f, ensure_ascii=False, indent=2)
with open("appointments.json", "w", encoding="utf-8") as f:
    json.dump(appointments, f, ensure_ascii=False, indent=2)

print("Sahte veriler başarıyla oluşturuldu: patients.json, doctors.json, appointments.json")
