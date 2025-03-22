import React, { useState } from 'react';

interface CitySearchProps {
  onAddCity: (city: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onAddCity }) => {
  const [city, setCity] = useState('');

  const handleAddCity = () => {
    if (city.trim()) {
      onAddCity(city);
      setCity('');
    }
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAddCity}
        className="p-3 font-semibold bg-green-500 text-black rounded-lg hover:bg-blue-600"
      >
        Add City
      </button>
    </div>
  );
};

export default CitySearch;
