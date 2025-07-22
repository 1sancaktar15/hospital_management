import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPatients, deletePatient } from '../../services/patientService';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';
import Table from '../ui/Table';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bu hastayı silmek istediğinize emin misiniz?')) {
      try {
        await deletePatient(id);
        setPatients(patients.filter(p => p.id !== id));
      } catch (err) {
        alert('Silme işlemi başarısız: ' + err.message);
      }
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Ad Soyad', accessor: 'name' },
    { header: 'Yaş', accessor: 'age' },
    { header: 'Adres', accessor: 'address', render: (value) => value || '-' },
    {
      header: 'İşlemler',
      render: (patient) => (
        <div className="space-x-2">
          <Link 
            to={`/patients/edit/${patient.id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            Düzenle
          </Link>
          <button 
            onClick={() => handleDelete(patient.id)}
            className="text-red-600 hover:text-red-800"
          >
            Sil
          </button>
        </div>
      )
    }
  ];

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Hata: {error}</div>;

  return (
    <div className="space-y-6">
      <Table data={patients} columns={columns} />
    </div>
  );
};

export default PatientList;
