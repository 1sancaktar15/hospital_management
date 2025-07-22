// src/pages/PatientCreatePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PatientForm from '../components/patients/PatientForm';
import { createPatient } from '../services/patientService';
import { useNotification } from '../context/NotificationContext';
import Notification from '../components/Notification';

const PatientCreatePage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleSubmit = async (formData) => {
    try {
      await createPatient(formData);
      showNotification('Hasta başarıyla oluşturuldu', 'success');
      navigate('/patients');
    } catch (error) {
      console.error("API Hatası Detayı:", error.response?.data);

      const errors = error.response?.data;
      let message = 'Hasta oluşturulamadı';

      if (Array.isArray(errors)) {
        message = errors.map(e => e.msg || JSON.stringify(e)).join('\n');
      } else if (typeof errors === 'object' && errors !== null) {
        message = errors.message || JSON.stringify(errors);
      } else if (typeof errors === 'string') {
        message = errors;
      }

      showNotification(message, 'error');
    }
  };


  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6">Yeni Hasta Ekle</h1>
      <PatientForm onSubmit={handleSubmit} />
      <Notification />
    </div>
  );
};

export default PatientCreatePage;