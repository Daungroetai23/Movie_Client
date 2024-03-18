// StepBar.js
import React from 'react';

function StepBar({ step }) {
  return (
    <div className="flex justify-center mt-4">
      <div className={`w-20 h-2 bg-gray-300 rounded-full ${step >= 1 ? 'bg-blue-500' : ''} mr-2`} />
      <div className={`w-20 h-2 bg-gray-300 rounded-full ${step >= 2 ? 'bg-blue-500' : ''} mr-2`} />
      <div className={`w-20 h-2 bg-gray-300 rounded-full ${step >= 3 ? 'bg-blue-500' : ''} mr-2`} />
      {/* Add more steps if needed */}
    </div>
  );
}

export default StepBar;
