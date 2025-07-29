# Hastane Yönetim Sistemi

Bu proje, hastane ve kliniklerin dijital olarak **hasta**, **doktor** ve **randevu** süreçlerini modern ve güvenli şekilde yönetmesine olanak tanıyan bir full-stack uygulamadır.  
Kullanıcı dostu yönetim paneli ve sağlam backend altyapısıyla, sağlık hizmetlerinde hızlı ve etkin yönetim sağlar.

---

## Özellikler

-Modern Arayüz: Responsive ve kullanıcı dostu React + Tailwind tasarımı

-Hasta, Doktor, Randevu CRUD işlemleri ve yönetimi

-Faker ile oluşturulmuş sahte verilerle dinamik veri yönetimi

-Karanlık mod (dark mode) desteği ve tema yönetimi

-Rol bazlı erişim kontrolleri (Yönetici ve Kullanıcı)

-Bildirimler ve hızlı etkileşimler için Notification Context kullanımı

-RESTful API ile backend (FastAPI ve Python)

-JWT tabanlı güvenli kimlik doğrulama ve yetkilendirme

-SQLite veritabanı ile veri kalıcılığı ve ilişkisel yapı

---



## Kurulum

### 1. Repoyu Klonlayın

```bash
git clone https://github.com/1sancaktar15/hospital_management.git
cd hospital_management
```
### 2. Backend Kurulumu

```
cd hospital-backend
python -m venv venv
source venv/bin/activate  # Windows için: venv\Scripts\activate
pip install -r requirements.txt
```
### Çalıştırmak için

```
uvicorn app.main:app --reload
# veya backend dizinine göre: python -m app.main
```
### 3. Frontend Kurulumu
Başka bir terminal açıp:
```
cd hospital-frontend
npm install
```
Tailwind CSS için (Geliştirmede):
```
npx @tailwindcss/cli -i ./src/index.css -o ./src/output.css --watch
```
src/index.js'de:
```
import './output.css';
```
olduğundan emin olun.
### React Uygulamasını Başlatmak İçin:
```
npm start
```
### Kullanım:
http://localhost:8000/docs üzerinden backend API dökümantasyonunu inceleyin (FastAPI varsayılan Swagger arayüzü).

http://localhost:3000 adresinde frontend arayüzü açın.

Giriş yapın, hasta/doktor/randevu ekleyin, güncelleyin veya yönetin.

### Ekran Görüntüleri
Hastalar:

![Dashboard Görüntüsü](/images/interface.png)

Admin Paneli:
![Admin Panel Görüntüsü](/images/AdminPanel1.png)

Dashboard:
![dashboard](/images/dashboard.png)

Ayarlar:
![ayarlar](/images/ayarlar.png)

Doktorlar:
![Doktorlar](/images/doktorlar.png)

Randevular:
![randavular](/images/randevular.png)

Sign-out:
![çıkış yap](/images/signout.png)


