import React, { useState } from 'react';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleToggleDarkMode = () => {
    setDarkMode(prev => !prev);
    // Global theme toggle logic would go here
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage({ text: 'Yeni şifre ve onay uyuşmuyor', type: 'error' });
      return;
    }
    
    if (!oldPassword || !newPassword) {
      setMessage({ text: 'Tüm şifre alanları dolu olmalı', type: 'error' });
      return;
    }
    
    // Password change API call would go here
    setMessage({ text: 'Şifre başarıyla değiştirildi!', type: 'success' });
    
    // Clear form
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Hesabınızı silmek istediğinizden emin misiniz? Tüm verileriniz kalıcı olarak silinecektir. Bu işlem geri alınamaz.')) {
      // Account deletion API call would go here
      alert('Hesabınız silindi!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Hesap Ayarları
        </h1>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between p-4 mb-8 bg-gray-50 rounded-xl transition-all hover:bg-gray-100">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Karanlık Mod</h2>
          <p className="text-sm text-gray-600">Arayüzü karanlık temaya geçirir</p>
        </div>
        <button 
          onClick={handleToggleDarkMode}
          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${darkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}
        >
          <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>

      {/* Password Change Form */}
      <form onSubmit={handleChangePassword} className="mb-10 p-6 bg-gray-50 rounded-xl">
        <div className="flex items-center mb-6">
          <div className="bg-indigo-100 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Şifre Değiştir</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700" htmlFor="oldPassword">Mevcut Şifre</label>
            <div className="relative">
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-3.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700" htmlFor="newPassword">Yeni Şifre</label>
            <div className="relative">
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700" htmlFor="confirmPassword">Yeni Şifre (Tekrar)</label>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {message.text && (
          <div className={`mt-4 p-3 rounded-lg ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}

        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
        >
          Şifreyi Güncelle
        </button>
      </form>

      {/* Account Deletion */}
      <div className="p-6 border border-red-200 bg-red-50 rounded-xl">
        <div className="flex items-center mb-4">
          <div className="bg-red-100 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-red-800">Hesabı Sil</h2>
        </div>
        
        <p className="text-red-700 mb-6">
          Hesabınızı silerseniz, tüm kişisel verileriniz kalıcı olarak silinecektir.
          Bu işlem geri alınamaz.
        </p>
        
        <button
          onClick={handleDeleteAccount}
          className="w-full bg-white text-red-600 px-6 py-3 rounded-lg font-medium border border-red-300 hover:bg-red-600 hover:text-white transition-colors"
        >
          Hesabı Kalıcı Olarak Sil
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;