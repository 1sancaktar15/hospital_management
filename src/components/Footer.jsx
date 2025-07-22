import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-2 md:mb-0">
            © 2023 Hastane Yönetim Sistemi. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            Made with <FaHeart className="text-red-500 mx-1" /> in Türkiye
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;