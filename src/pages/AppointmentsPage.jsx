import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Basit tarih formatlama fonksiyonu
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
};

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/scripts/appointments.json')
      .then(res => {
        if (!res.ok) throw new Error('Randevular yüklenemedi');
        return res.json();
      })
      .then(data => {
        setAppointments(data);
        setFilteredAppointments(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = appointments.filter(apt =>
      apt.status.toLowerCase().includes(term) ||
      apt.patient_id.toString().includes(term) ||
      formatDate(apt.date).toLowerCase().includes(term)
    );
    setFilteredAppointments(filtered);
  }, [searchTerm, appointments]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Randevu Yönetimi</h1>
        <Link to="/appointments/new" className="bg-indigo-600 px-4 py-2 text-white rounded hover:bg-indigo-700">
          Yeni Randevu Ekle
        </Link>
      </div>

      <div className="relative max-w-sm mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Hasta ID, durum veya tarih ara..."
          className="pl-10 py-2 w-full border rounded border-gray-300 focus:outline-none focus:ring-indigo-500"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredAppointments.length === 0 ? (
        <p>Randevu bulunamadı.</p>
      ) : (
        <table className="min-w-full border border-gray-200 table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="border px-4 py-2 text-left">Tarih</th>
              <th className="border px-4 py-2 text-left">Hasta ID</th>
              <th className="border px-4 py-2 text-left">Doktor ID</th>
              <th className="border px-4 py-2 text-left">Durum</th>
              <th className="border px-4 py-2 text-left">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(apt => (
              <tr key={apt.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{formatDate(apt.date)}</td>
                <td className="border px-4 py-2">{apt.patient_id}</td>
                <td className="border px-4 py-2">{apt.doctor_id}</td>
                <td className="border px-4 py-2">{apt.status}</td>
                <td className="border px-4 py-2">
                  <Link to={`/appointments/edit/${apt.id}`} className="text-indigo-600 hover:underline mr-3">Düzenle</Link>
                  <button className="text-red-600 hover:underline">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentsPage;
