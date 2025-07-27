import React, { useEffect, useState } from 'react';
import { FiActivity, FiUsers, FiCalendar, FiUserPlus, FiAlertTriangle } from 'react-icons/fi';

import DoctorList from '../components/doctors/DoctorList';
import AppointmentList from '../components/appointments/AppointmentList';
import PatientList from '../components/patients/PatientList';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeList, setActiveList] = useState(null); // "patients", "doctors", "appointments"

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      setError("Token bulunamadı. Lütfen giriş yapın.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8000/admin/dashboard", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Yetkisiz veya hata: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const stats = [
    { title: "Toplam Hasta", value: data?.total_patients || 0, icon: <FiUsers className="w-6 h-6" />, color: "bg-blue-500", key: "patients" },
    { title: "Aktif Randevular", value: data?.active_appointments || 0, icon: <FiCalendar className="w-6 h-6" />, color: "bg-green-500", key: "appointments" },
    { title: "Toplam Doktor", value: data?.total_doctors || 0, icon: <FiUserPlus className="w-6 h-6" />, color: "bg-purple-500", key: "doctors" },
    { title: "Bugünkü Randevular", value: data?.today_appointments || 0, icon: <FiActivity className="w-6 h-6" />, color: "bg-amber-500", key: "todayAppointments" }
  ];

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex items-center">
          <FiAlertTriangle className="h-6 w-6 text-red-500 mr-4" />
          <div>
            <h3 className="text-lg font-medium text-red-800">Hata oluştu</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const handleCardClick = (key) => {
    if (key === activeList) {
      setActiveList(null); // tekrar tıklanırsa kapat
    } else {
      setActiveList(key);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
        <p className="mt-2 text-gray-600">Sistem istatistikleri ve genel bakış</p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:ring-2 hover:ring-indigo-500"
              onClick={() => handleCardClick(stat.key)}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          {activeList === "patients" && <PatientList />}
          {activeList === "doctors" && <DoctorList />}
          {activeList === "appointments" && <AppointmentList />}
          {!activeList && <div>İlgili kartı tıklayarak detaya bakabilirsiniz.</div>}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
