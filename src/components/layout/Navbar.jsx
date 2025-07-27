import React from 'react';
import { FaBell, FaCog } from 'react-icons/fa';

const Navbar = () => {
  return (
    <header className="bg-[#1e2a39] shadow-sm">
      <div className="flex items-center justify-between px-6 py-5">
        {/* Sol: Logo ve Başlık */}
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Hastane Logosu" 
            className="h-14 w-14 object-contain" // biraz büyüttüm
          />
          <h1 className="ml-4 text-2xl font-bold text-white">Hastane Yönetim</h1> {/* metin boyutunu artırdım */}
        </div>

        {/* Sağ: Bildirim, Ayar, Kullanıcı */}
        <div className="flex items-center space-x-8"> {/* ikonlar arası boşluğu biraz artırdım */}
          <button className="relative text-white hover:text-gray-300">
            <FaBell size={24} /> {/* ikon boyutunu artırdım */}
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>
          <button className="text-white hover:text-gray-300">
            <FaCog size={24} />
          </button>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <p className="text-white font-semibold text-base">Admin</p>
              <p className="text-gray-300 text-sm">Yönetici</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
