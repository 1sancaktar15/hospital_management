import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StatCard = ({ stat }) => {
  return (
    <div className="card overflow-hidden">
      <div className="p-5 flex justify-between items-start">
        <div>
          <div className="text-gray-500 text-sm mb-1">{stat.title}</div>
          <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
        </div>
        <div className={`${stat.color} p-3 rounded-lg text-white`}>
          {stat.icon}
        </div>
      </div>
      
      <div className={`px-5 py-3 ${
        stat.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
      }`}>
        <div className="flex items-center">
          {stat.trend === 'up' ? (
            <FaArrowUp className="mr-1" />
          ) : (
            <FaArrowDown className="mr-1" />
          )}
          <span>{stat.change}</span>
          <span className="ml-2">geçen aya göre</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;