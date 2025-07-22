// CurrencyWidget.jsx
import React from 'react';
import { FaDollarSign, FaChartLine } from 'react-icons/fa';

const CurrencyWidget = () => {
  const currencies = [
    { pair: 'USD/TRY', rate: '90.78', change: '+0.5%' },
    { pair: 'EUR/TRY', rate: '98.45', change: '+0.3%' },
    { pair: 'GBP/TRY', rate: '114.20', change: '-0.2%' }
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Döviz Kuru</h2>
        <FaChartLine className="text-blue-600" />
      </div>
      
      <div className="space-y-3">
        {currencies.map((currency, index) => (
          <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100">
            <div className="flex items-center">
              <FaDollarSign className="text-gray-500 mr-2" />
              <span className="font-medium">{currency.pair}</span>
            </div>
            <div className="text-right">
              <div className="font-semibold">{currency.rate}</div>
              <div className={`text-sm ${
                currency.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {currency.change}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Son 24 saatteki döviz kuru değişimleri
      </div>
    </div>
  );
};

export default CurrencyWidget;