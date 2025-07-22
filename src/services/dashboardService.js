// src/services/dashboardService.js
export const getDashboardStats = async () => {
  // (Burada örnek veri dönüyor, gerçek API'ye bağlamak için bu bloğu değiştirebiliriz)
  return {
    totalPatients: 1242,
    activeDoctors: 42,
    todaysAppointments: 28,
    patientsChange: '+12%',
    doctorsChange: '+5%',
    appointmentsChange: '-3%',
  };
};


export const getTopDoctors = async () => {
  return [
    { id: 1, name: 'Dr. Sücü', specialty: 'Kardiyoloji', appointments: 142 },
    { id: 2, name: 'Dr. Refz', specialty: 'Nöroloji', appointments: 128 },
    { id: 3, name: 'Dr. Kir', specialty: 'Ortopedi', appointments: 112 },
  ];
};
