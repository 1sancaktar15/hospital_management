// src/components/patients/PatientForm.jsx
import React from 'react';
import FormField from '../ui/FormField';

const PatientForm = ({ patient = {}, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    first_name: patient.first_name || '',
    last_name: patient.last_name || '',
    gender: patient.gender || '',
    date_of_birth: patient.date_of_birth || '',
    phone: patient.phone || '',
    email: patient.email || '',
    address: patient.address || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Ad"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        
        <FormField
          label="Soyad"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        
        <FormField
          label="Cinsiyet"
          name="gender"
          type="select"
          value={formData.gender}
          onChange={handleChange}
          options={[
            { value: '', label: 'Seçiniz' },
            { value: 'male', label: 'Erkek' },
            { value: 'female', label: 'Kadın' },
            { value: 'other', label: 'Diğer' }
          ]}
          required
        />
        
        <FormField
          label="Doğum Tarihi"
          name="date_of_birth"
          type="date"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
        />
        
        <FormField
          label="Telefon"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <FormField
        label="Adres"
        name="address"
        type="textarea"
        value={formData.address}
        onChange={handleChange}
      />
      
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {patient.id ? 'Güncelle' : 'Oluştur'}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;