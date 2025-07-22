import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaSearch, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-3 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FaBars className="text-xl" />
            </button>
            
            <div className="text-xl font-bold text-blue-600">
              HASTANE YÖNETİM
            </div>
          </div>
          
          <div className="hidden md:block w-1/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Ara..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <FaBell className="text-gray-600" />
              <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                3
              </span>
            </button>
            
            <div className="flex items-center">
              <div className="mr-3 text-right hidden md:block">
                <div className="font-medium text-sm">Elif Özün</div>
                <div className="text-xs text-gray-500">Yönetici</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-blue-500">
                <FaUserCircle className="text-gray-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobil Arama Çubuğu */}
        {isMenuOpen && (
          <div className="md:hidden py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Ara..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;