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
      <nav className="pt-4">
        <ul className="space-y-2"> {/* Increased spacing */}
          <li>
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `flex items-center p-4 text-lg hover:bg-gray-700 ${
                  isActive ? 'bg-[#0c4a6e]' : '' /* Match navbar color */
                }`
              }
            >
              <FaHome className="mr-4 text-xl" /> {/* Larger icon */}
              <span>Dashboard</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/patients" 
              className={({isActive}) => 
                `flex items-center p-4 text-lg hover:bg-gray-700 ${
                  isActive ? 'bg-[#0c4a6e]' : ''
                }`
              }
            >
              <FaUserInjured className="mr-4 text-xl" /> {/* Larger icon */}
              <span>Hastalar</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/doctors" 
              className={({isActive}) => 
                `flex items-center p-4 text-lg hover:bg-gray-700 ${
                  isActive ? 'bg-[#0c4a6e]' : ''
                }`
              }
            >
              <FaUserMd className="mr-4 text-xl" /> {/* Larger icon */}
              <span>Doktorlar</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/appointments" 
              className={({isActive}) => 
                `flex items-center p-4 text-lg hover:bg-gray-700 ${
                  isActive ? 'bg-[#0c4a6e]' : ''
                }`
              }
            >
              <FaCalendarAlt className="mr-4 text-xl" /> {/* Larger icon */}
              <span>Randevular</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/settings" 
              className={({isActive}) => 
                `flex items-center p-4 text-lg hover:bg-gray-700 ${
                  isActive ? 'bg-[#0c4a6e]' : ''
                }`
              }
            >
              <FaCog className="mr-4 text-xl" /> {/* Larger icon */}
              <span>Ayarlar</span>
            </NavLink>
          </li>
        </ul>
        
        <div className="mt-10 border-t border-gray-700 pt-4">
            <NavLink 
              to="/logout" 
              className={({isActive}) => 
                `flex items-center p-4 text-lg hover:bg-gray-700 ${
                  isActive ? 'bg-[#0c4a6e]' : ''
                }`
              }
            >
              <FaSignOutAlt className="mr-4 text-xl" /> {/* Larger icon */}
              <span>Çıkış Yap</span>
            </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;