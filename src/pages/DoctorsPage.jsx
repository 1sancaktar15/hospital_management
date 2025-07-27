// src/pages/doctors/DoctorsPage.jsx
import React, { useState, useEffect } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import DoctorList from '../components/doctors/DoctorList';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('http://localhost:8000/doctors', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Doktorlar alınamadı');
        
        let data = await response.json();
        
        // Eksik alanları düzelt
        data = data.map(doctor => ({
          ...doctor,
          department: doctor.department || '',
          email: doctor.email || '',
          title: doctor.title || ''
        }));
        
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filtreleme ve arama fonksiyonu
  useEffect(() => {
    let result = doctors;
    
    // Uzmanlık filtresi
    if (specializationFilter !== 'all') {
      result = result.filter(d => d.department === specializationFilter);
    }
    
    // Arama filtresi
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(term) ||
        d.department.toLowerCase().includes(term) ||
        d.email.toLowerCase().includes(term)
      );
    }
    
    setFilteredDoctors(result);
  }, [searchTerm, specializationFilter, doctors]);

  // Benzersiz uzmanlık alanları
  const specializations = [...new Set(doctors.map(d => d.department))].filter(Boolean);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Doktor Listesi</h1>
          <Link
            to="/doctors/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <FiPlus className="mr-2" />
            Yeni Doktor Ekle
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Doktor, bölüm veya email ara..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <span className="text-gray-700 mr-2">Uzmanlık:</span>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={specializationFilter}
                onChange={(e) => setSpecializationFilter(e.target.value)}
              >
                <option value="all">Tümü</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <DoctorList doctors={filteredDoctors} />

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Toplam <span className="font-semibold">{filteredDoctors.length}</span> doktor
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
            Önceki
          </button>
          <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm">
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

export default DoctorsPage;