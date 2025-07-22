import React, { useState, useEffect } from "react";

const getDashboardStats = async () => {
  return {
    totalPatients: 50,
    activeDoctors: 10,
    todaysAppointments: 5,
    patientsChange: "+10%",
    doctorsChange: "+2%",
    appointmentsChange: "-1%",
  };
};

const getTopDoctors = async () => {
  return [
    { id: 1, name: "Dr. A", specialty: "Kardiyoloji", appointments: 40 },
    { id: 2, name: "Dr. B", specialty: "Ortopedi", appointments: 35 },
  ];
};

const TestDashboard = () => {
  const [stats, setStats] = useState(null);
  const [topDoctors, setTopDoctors] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const statsResult = await getDashboardStats();
      const doctorsResult = await getTopDoctors();
      setStats(statsResult);
      setTopDoctors(doctorsResult);
    }
    fetchData();
  }, []);

  if (!stats || !topDoctors) return <div>Yükleniyor...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard Verileri (Test)</h1>

      <h2>İstatistikler</h2>
      <ul>
        <li>Toplam Hasta: {stats.totalPatients}</li>
        <li>Aktif Doktor: {stats.activeDoctors}</li>
        <li>Bugünkü Randevu: {stats.todaysAppointments}</li>
      </ul>

      <h2>En Çok Randevu Alan Doktorlar</h2>
      <ul>
        {topDoctors.map((doc) => (
          <li key={doc.id}>
            {doc.name} | {doc.specialty} | {doc.appointments} Randevu
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestDashboard;
