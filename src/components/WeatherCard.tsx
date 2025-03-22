interface WeatherCardProps {
    city: string;
    temperature: number;
    weatherCondition: string;
    weatherIcon: string;
    humidity: number;
    windSpeed: number;
    onRemove: () => void;
  }
  
  export default function WeatherCard({
    city,
    temperature,
    weatherCondition,
    weatherIcon,
    humidity,
    windSpeed,
    onRemove,
  }: WeatherCardProps) {
    return (
      <div className="bg-blue-200 p-4 m-2 rounded-lg mt-10 shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{city}</h2>
          <div className="flex items-center gap-2">
            <p className="">Condition: {weatherCondition}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt={weatherCondition}
              className="w-10 h-10"
            />
          </div>
          <p>Temperature: {temperature}°</p>
          <p>Humidity: {humidity}%</p>
          <p>Wind Speed: {windSpeed} km/h</p>
        </div>
        <button
          onClick={onRemove}
          className="text-white font-semibold px-3 py-2 rounded-lg mt-2 bg-red-500 hover:bg-red-700"
        >
          Remove City
        </button>
      </div>
    );
  }
  