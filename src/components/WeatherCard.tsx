interface WeatherCardProps {
    city: string;
    temperature: number;
    weatherCondition: string;
    humidity: number;
    windSpeed: number;
    onRemove: () => void;
    unit: "metric" | "imperial";
  }
  
  export default function WeatherCard({
    city,
    temperature,
    weatherCondition,
    humidity,
    windSpeed,
    onRemove,
    unit,
  }: WeatherCardProps) {
    const unitSymbol = unit === "metric" ? "°C" : "°F";
  
    return (
      <div className="bg-blue-200 p-4 m-2 rounded-lg mt-10">
        <h2 className="text-xl font-bold">{city}</h2>
        <p>Temperature: {temperature}{unitSymbol}</p>
        <p>Condition: {weatherCondition}</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {windSpeed} {unit === "metric" ? "km/h" : "mph"}</p>
        <button
          onClick={onRemove}
          className="text-white font-semibold px-3 py-2 rounded-lg mt-2 bg-red-500 hover:bg-red-700"
        >
          Remove City
        </button>
      </div>
    );
  }
  