// src/components/appointments/AppointmentList.jsx
import React from 'react';
import { FiUser, FiCalendar, FiClock } from 'react-icons/fi';

const AppointmentList = ({ appointments }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Durumları Türkçe'ye çevir
  const translateStatus = (status) => {
    const statusMap = {
      'Scheduled': 'Planlandı',
      'Completed': 'Tamamlandı',
      'Cancelled': 'İptal Edildi',
      'Pending': 'Beklemede'
    };
    return statusMap[status] || status;
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <FiCalendar className="text-gray-500" />
        </div>
        <h3 className="mt-2 text-lg font-medium text-gray-900">Randevu bulunamadı</h3>
        <p className="mt-1 text-sm text-gray-500">
          Arama kriterlerinize uygun randevu bulunamadı.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hasta
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Doktor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tarih & Saat
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Durum
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center mr-3">
                    <FiUser className="text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{appointment.patient_name}</div>
                    {appointment.patient_id && (
                      <div className="text-xs text-gray-500">ID: {appointment.patient_id}</div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center mr-3">
                    <FiUser className="text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{appointment.doctor_name}</div>
                    {appointment.doctor_id && (
                      <div className="text-xs text-gray-500">ID: {appointment.doctor_id}</div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2 text-gray-400" />
                    {appointment.date ? new Date(appointment.date).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}
                  </div>
                  <div className="flex items-center mt-1">
                    <FiClock className="mr-2 text-gray-400" />
                    {appointment.time || 'Belirtilmemiş'}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                  {translateStatus(appointment.status)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-4">Düzenle</button>
                <button className="text-red-600 hover:text-red-900">Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;