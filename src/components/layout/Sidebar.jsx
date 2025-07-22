// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaUserInjured, 
  FaUserMd, 
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Hastane Yönetim Sistemi </h1>
      </div>
      
      <nav className="mt-5">
        <ul className="space-y-1">
          <li>
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `flex items-center p-3 hover:bg-gray-700 ${
                  isActive ? 'bg-blue-600' : ''
                }`
              }
            >
              <FaHome className="mr-3" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/patients" 
              className={({isActive}) => 
                `flex items-center p-3 hover:bg-gray-700 ${
                  isActive ? 'bg-blue-600' : ''
                }`
              }
            >
              <FaUserInjured className="mr-3" />
              <span>Hastalar</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/doctors" 
              className={({isActive}) => 
                `flex items-center p-3 hover:bg-gray-700 ${
                  isActive ? 'bg-blue-600' : ''
                }`
              }
            >
              <FaUserMd className="mr-3" />
              <span>Doktorlar</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/appointments" 
              className={({isActive}) => 
                `flex items-center p-3 hover:bg-gray-700 ${
                  isActive ? 'bg-blue-600' : ''
                }`
              }
            >
              <FaCalendarAlt className="mr-3" />
              <span>Randevular</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/settings" 
              className={({isActive}) => 
                `flex items-center p-3 hover:bg-gray-700 ${
                  isActive ? 'bg-blue-600' : ''
                }`
              }
            >
              <FaCog className="mr-3" />
              <span>Ayarlar</span>
            </NavLink>
          </li>
        </ul>
        
        <div className="mt-10 border-t border-gray-700 pt-4">
          <button className="flex items-center w-full p-3 hover:bg-gray-700">
            <FaSignOutAlt className="mr-3" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;