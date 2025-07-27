// src/components/doctors/DoctorList.jsx
import React from 'react';
import { FiUser, FiMail } from 'react-icons/fi';

const DoctorList = ({ doctors }) => {
  const getDepartmentColor = (department) => {
    const colors = {
      'Dahiliye': 'bg-blue-100 text-blue-800',
      'Pediatri': 'bg-green-100 text-green-800',
      'Nöroloji': 'bg-purple-100 text-purple-800',
      'Ortopedi': 'bg-amber-100 text-amber-800',
      'Göz': 'bg-indigo-100 text-indigo-800',
      'Cildiye': 'bg-pink-100 text-pink-800',
      'KBB': 'bg-cyan-100 text-cyan-800',
      'Kardiyoloji': 'bg-red-100 text-red-800',
    };
    return colors[department] || 'bg-gray-100 text-gray-800';
  };

  if (doctors.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <FiUser className="text-gray-500" />
        </div>
        <h3 className="mt-2 text-lg font-medium text-gray-900">Doktor bulunamadı</h3>
        <p className="mt-1 text-sm text-gray-500">
          Arama kriterlerinize uygun doktor bulunamadı.
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
              Doktor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Unvan
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bölüm
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              İletişim
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {doctors.map((doctor) => (
            <tr key={doctor.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center mr-3">
                    <FiUser className="text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{doctor.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getDepartmentColor(doctor.department)}`}>
                  {doctor.department}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 flex items-center">
                  <FiMail className="mr-2 text-gray-400" />
                  <a href={`mailto:${doctor.email}`} className="text-indigo-600 hover:text-indigo-900">
                    {doctor.email}
                  </a>
                </div>
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

export default DoctorList;