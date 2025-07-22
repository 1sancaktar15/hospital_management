import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PatientForm from '../components/patients/PatientForm';
import { getPatient, updatePatient } from '../services/patientService';
import { useNotification } from '../context/NotificationContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const PatientEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await getPatient(id);
        setPatient(data);
      } catch (error) {
        showNotification(`Hasta bilgileri alınamadı: ${error.message}`, 'error');
        navigate('/patients');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPatient();
  }, [id, navigate, showNotification]);

  const handleSubmit = async (patientData) => {
    setUpdating(true);
    try {
      await updatePatient(id, patientData);
      showNotification('Hasta bilgileri güncellendi', 'success');
      navigate('/patients');
    } catch (error) {
      showNotification(`Güncelleme başarısız: ${error.message}`, 'error');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Hasta Düzenle</h1>
      <PatientForm 
        patient={patient} 
        onSubmit={handleSubmit} 
        loading={updating} 
      />
    </div>
  );
};

export default PatientEditPage;
