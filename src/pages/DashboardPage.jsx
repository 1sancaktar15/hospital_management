import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUserInjured, 
  FaUserMd, 
  FaCalendarAlt,
  FaDollarSign,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaEllipsisH
} from 'react-icons/fa';
import StatCard from '../components/StatCard';
import { useNotification } from '../context/NotificationContext';

const DashboardPage = () => {
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // showNotification('Dashboard başarıyla yüklendi', 'success');
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { 
      title: 'Toplam Hasta', 
      value: '1,248', 
      change: '+12%', 
      icon: <FaUserInjured className="text-2xl" />,
      color: 'bg-blue-500',
      trend: 'up'
    },
    { 
      title: 'Aktif Doktor', 
      value: '42', 
      change: '+5%', 
      icon: <FaUserMd className="text-2xl" />,
      color: 'bg-green-500',
      trend: 'up'
    },
    { 
      title: 'Bugünkü Randevu', 
      value: '28', 
      change: '-3%', 
      icon: <FaCalendarAlt className="text-2xl" />,
      color: 'bg-purple-500',
      trend: 'down'
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Başlık ve Üst Bilgi */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Hastane Yönetim Sistemi</h1>
          <div className="text-gray-600 flex items-center">
            <span>Dashboard</span>
            <span className="mx-2">•</span>
            <span className="text-blue-600 font-medium">Genel Bakış</span>
          </div>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Ana İçerik */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol Sütun */}
          <div className="lg:col-span-2">
            {/* Hızlı Erişim */}
            <div className="card mb-6">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Hızlı Erişim</h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link 
                    to="/patients" 
                    className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div className="bg-blue-500 p-3 rounded-full text-white mb-3">
                      <FaUserInjured className="text-xl" />
                    </div>
                    <span className="font-medium text-gray-800">Hastalar</span>
                  </Link>
                  
                  <Link 
                    to="/doctors" 
                    className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <div className="bg-green-500 p-3 rounded-full text-white mb-3">
                      <FaUserMd className="text-xl" />
                    </div>
                    <span className="font-medium text-gray-800">Doktorlar</span>
                  </Link>
                  
                  <Link 
                    to="/appointments" 
                    className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <div className="bg-purple-500 p-3 rounded-full text-white mb-3">
                      <FaCalendarAlt className="text-xl" />
                    </div>
                    <span className="font-medium text-gray-800">Randevular</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Son Etkinlikler */}
            <div className="card">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Son Etkinlikler</h2>
                <button className="text-gray-500 hover:text-gray-700">
                  <FaEllipsisH />
                </button>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                      <FaUserInjured className="text-blue-500 text-sm" />
                    </div>
                    <div>
                      <p className="font-medium">Yeni hasta kaydı oluşturuldu</p>
                      <p className="text-gray-500 text-sm">Ahmet Yılmaz - 10 dakika önce</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                      <FaCalendarAlt className="text-green-500 text-sm" />
                    </div>
                    <div>
                      <p className="font-medium">Yeni randevu oluşturuldu</p>
                      <p className="text-gray-500 text-sm">Dr. Ayşe Kaya - 2 saat önce</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-3 mt-1">
                      <FaUserMd className="text-purple-500 text-sm" />
                    </div>
                    <div>
                      <p className="font-medium">Doktor bilgileri güncellendi</p>
                      <p className="text-gray-500 text-sm">Dr. Mehmet Demir - 5 saat önce</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sağ Sütun */}
          <div>
            {/* Döviz Kuru */}
            <div className="card mb-6">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Döviz Kuru</h2>
              </div>
              <div className="p-5">
                <div className="bg-gray-50 rounded-lg p-5 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <FaDollarSign className="text-yellow-500 mr-2" />
                      <span className="font-medium">USD/TRY</span>
                    </div>
                    <div className="flex items-center">
                      <FaChartLine className="text-green-500 mr-2" />
                      <span className="text-lg font-bold">90.78</span>
                      <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                        <FaArrowUp className="mr-1" /> +0.5%
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Son 24 saatteki döviz kuru değişimleri
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">EUR/TRY</div>
                    <div className="font-bold">98.42</div>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">GBP/TRY</div>
                    <div className="font-bold">115.63</div>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">USD/EUR</div>
                    <div className="font-bold">0.92</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sistem Durumu */}
            <div className="card">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Sistem Durumu</h2>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Sunucu Yükü</span>
                      <span className="text-sm font-medium text-gray-700">42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: '42%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Veritabanı</span>
                      <span className="text-sm font-medium text-gray-700">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: '78%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Ağ Trafiği</span>
                      <span className="text-sm font-medium text-gray-700">56%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: '56%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;