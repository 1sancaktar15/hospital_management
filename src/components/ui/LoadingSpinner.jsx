 import React from 'react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
    <span className="ml-4 text-blue-600">Yükleniyor...</span>
  </div>
);

export default LoadingSpinner;
