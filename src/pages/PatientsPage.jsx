// PatientsPage.jsx
import React, { useState } from 'react';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PatientList from '../components/patients/PatientList';

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');

  // Faker ile oluşturulmuş örnek hastalar
  const patients = [
    { id: 2, first_name: 'Yurdanur', last_name: 'Karadeniz', gender: 'female', age: 45, address: 'İstanbul' },
    { id: 3, first_name: 'Kılıçbay', last_name: 'Zengin', gender: 'male', age: 39, address: 'Ankara' },
    { id: 4, first_name: 'Öge', last_name: 'Kısakürek', gender: 'male', age: 72, address: 'İzmir' },
    // ... diğer hastalar
  ];

  const filteredPatients = patients.filter(p => {
    const fullName = `${p.first_name} ${p.last_name}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === 'all' || p.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Hasta Listesi</h1>
          <Link
            to="/patients/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FaPlus className="mr-2" />
            Yeni Hasta Ekle
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Hasta ara..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <FaFilter className="text-gray-500 mr-2" />
              <span className="text-gray-700 mr-2">Cinsiyet:</span>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="all">Tümü</option>
                <option value="male">Erkek</option>
                <option value="female">Kadın</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <PatientList patients={filteredPatients} />

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Toplam <span className="font-semibold">{filteredPatients.length}</span> hasta
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
            Önceki
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
            Sonraki
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
