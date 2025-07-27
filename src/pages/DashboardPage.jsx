import React, { useState, useEffect } from 'react';
import { 
  FaCalendarAlt,
  FaUserInjured,
  FaUserMd,
  FaBed,
  FaArrowUp,
  FaArrowDown,
  FaStethoscope,
  FaHeartbeat,
  FaClinicMedical,
  FaProcedures
} from 'react-icons/fa';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalPatients: 200,
    activeDoctors: 40,
    todayAppointmentsCount: 0,
    occupancy: 72,
    change: 32
  });

  const [todayAppointments, setTodayAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Randevu durumuna göre renk sınıfı
  const getStatusColor = (status) => {
    switch(status) {
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-indigo-100 text-indigo-800';
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        
        // Randevuları çek
        const response = await fetch('/scripts/appointments.json');
        if (!response.ok) throw new Error('Randevu verileri alınamadı');
        const appointmentsData = await response.json();
        
        // Bugünün tarihi
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999);
        
        // Bugünkü randevuları filtrele
        const todaysApps = appointmentsData.filter(app => {
          const appDate = new Date(app.date);
          return appDate >= today && appDate <= todayEnd;
        });
        
        // Yaklaşan randevuları filtrele (bugünden sonraki)
        const upcomingApps = appointmentsData
          .filter(app => new Date(app.date) > todayEnd)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);  // İlk 3 randevu
        
        // Bugünkü randevuları formatla
        const formattedTodayApps = todaysApps.map(app => ({
          id: app.id,
          time: new Date(app.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
          patient: `Hasta #${app.patient_id}`,
          type: app.status || 'Randevu',
          status: app.status.toLowerCase().includes('devam') ? 'in-progress' : 'upcoming'
        }));
        
        // Yaklaşan randevuları formatla
        const formattedUpcomingApps = upcomingApps.map(app => ({
          id: app.id,
          doctor: `Dr. ${app.doctor_id}`,
          date: new Date(app.date).toLocaleDateString('tr-TR', { 
            day: 'numeric', 
            month: 'long', 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          type: app.status
        }));
        
        setTodayAppointments(formattedTodayApps);
        setUpcomingAppointments(formattedUpcomingApps);
        
        // İstatistikleri güncelle
        setStats(prev => ({
          ...prev,
          todayAppointmentsCount: todaysApps.length
        }));
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg max-w-7xl mx-auto mt-8">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Sayfa Başlığı */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900">Dashboard</h1>
          <p className="text-indigo-600">Sistem istatistikleri ve genel bakış</p>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Toplam Hasta */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-600">Toplam Hasta</h3>
                <p className="text-3xl font-bold text-indigo-800 mt-2">{stats.totalPatients.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <FaArrowUp className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12% geçen aya göre</span>
                </div>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <FaUserInjured className="text-indigo-600 text-xl" />
              </div>
            </div>
          </div>
          
          {/* Aktif Doktor */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-600">Aktif Doktor</h3>
                <p className="text-3xl font-bold text-blue-800 mt-2">{stats.activeDoctors}</p>
                <div className="flex items-center mt-2">
                  <FaArrowUp className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+5% geçen aya göre</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUserMd className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          
          {/* Bugünkü Randevu */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-600">Bugünkü Randevu</h3>
                <p className="text-3xl font-bold text-purple-800 mt-2">{stats.todayAppointmentsCount}</p>
                <div className="flex items-center mt-2">
                  <FaArrowUp className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+3% geçen aya göre</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaCalendarAlt className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>
          
          {/* Hastane Doluluk Oranı */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-teal-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-600">Doluluk Oranı</h3>
                <p className="text-3xl font-bold text-teal-800 mt-2">{stats.occupancy}%</p>
                <div className="flex items-center mt-2">
                  <FaArrowUp className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+32% geçen aya göre</span>
                </div>
              </div>
              <div className="bg-teal-100 p-3 rounded-full">
                <FaBed className="text-teal-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Ana İçerik Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol Sütun - Randevular */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">Bugünkü Randevular</h2>
                  <div className="bg-indigo-800 text-white px-3 py-1 rounded-full text-sm">
                    {new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <div className="space-y-4">
                  {todayAppointments.length > 0 ? (
                    todayAppointments.slice(0, 3).map(appointment => (
                      <div 
                        key={appointment.id} 
                        className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 transition-all hover:shadow-md"
                      >
                        <div className="bg-indigo-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                          <span className="font-medium">{appointment.time}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-indigo-900">{appointment.patient}</h4>
                          <p className="text-sm text-indigo-600">{appointment.type}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status === 'in-progress' ? 'Devam Ediyor' : 'Yaklaşıyor'}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-4 text-gray-500">Bugün için randevu bulunamadı</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Hasta İstatistik Grafiği */}
            <div className="bg-white rounded-2xl shadow-lg mt-6 p-6">
              <h2 className="text-xl font-bold text-indigo-800 mb-4">Hasta İstatistikleri</h2>
              
              <div className="flex items-end h-40 space-x-2">
                {[65, 80, 45, 75, 90, 40, 30].map((height, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t-lg"
                      style={{ height: `${height}%` }}
                    ></div>
                    <p className="text-xs mt-2 text-indigo-600 font-medium">
                      {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][index]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sağ Sütun - Diğer Bilgiler */}
          <div>
            {/* Yaklaşan Randevular */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Yaklaşan Randevular</h2>
              </div>
              
              <div className="p-5">
                <div className="space-y-5">
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.slice(0, 3).map(app => (
                      <div className="flex items-start" key={app.id}>
                        <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                          <FaStethoscope className="text-indigo-600 text-xl" />
                        </div>
                        <div>
                          <h3 className="font-bold text-indigo-900">{app.doctor}</h3>
                          <p className="text-sm text-indigo-600">{app.date}</p>
                          <span className="inline-block mt-1 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                            {app.type}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-4 text-gray-500">Yaklaşan randevu bulunamadı</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Yatak Durumu */}
            <div className="bg-white rounded-2xl shadow-lg mt-6">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Yatak Durumu</h2>
              </div>
              
              <div className="p-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
                    <div className="flex items-center mb-3">
                      <FaBed className="text-indigo-600 mr-2" />
                      <span className="font-medium text-indigo-800">Genel Servis</span>
                    </div>
                    <div className="text-2xl font-bold text-indigo-900">24/36</div>
                    <div className="text-xs text-indigo-600 mt-1">Müsait yatak</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-center mb-3">
                      <FaProcedures className="text-blue-600 mr-2" />
                      <span className="font-medium text-blue-800">Yoğun Bakım</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">8/12</div>
                    <div className="text-xs text-blue-600 mt-1">Müsait yatak</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-4 rounded-xl border border-purple-100">
                    <div className="flex items-center mb-3">
                      <FaUserInjured className="text-purple-600 mr-2" />
                      <span className="font-medium text-purple-800">Pediatri</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">12/18</div>
                    <div className="text-xs text-purple-600 mt-1">Müsait yatak</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-xl border border-red-100">
                    <div className="flex items-center mb-3">
                      <FaClinicMedical className="text-red-600 mr-2" />
                      <span className="font-medium text-red-800">Acil</span>
                    </div>
                    <div className="text-2xl font-bold text-red-900">4/8</div>
                    <div className="text-xs text-red-600 mt-1">Müsait yatak</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Alt Bilgi */}
      <div className="max-w-7xl mx-auto px-4 py-6 mt-8 text-center text-indigo-600 text-sm border-t border-indigo-100">
        <p>© 2023 MediTrack Hastane Yönetim Sistemi. Tüm hakları saklıdır.</p>
        <p className="mt-1">Sürüm 2.1.0 | Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
      </div>
    </div>
  );
};

export default DashboardPage;