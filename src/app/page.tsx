"use client";

import React, { JSX, useState, useEffect } from "react";
import CitySearch from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import UnitToggle from "@/components/UnitToggle";
import LoadingState from "@/app/LoadingState";
import ErrorHandling from "@/app/global-error";

const API_KEY = "da8944acf6c0cd0287f0e01943c30f46";

type WeatherData = {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
};

export default function Home(): JSX.Element {
  const [cities, setCities] = useState<string[]>([]);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});

  // Load cities from localStorage on initial render
  useEffect(() => {
    const storedCities = localStorage.getItem("cities");
    if (storedCities) {
      const parsedCities = JSON.parse(storedCities);
      setCities(parsedCities);
      parsedCities.forEach((city: string) => fetchWeatherData(city));
    }
  }, []);

  // Save cities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const fetchWeatherData = async (city: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data: WeatherData = await response.json();
      setWeatherData((prev) => ({ ...prev, [city]: data }));
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to fetch weather data. Please try again.");
    }
  };

  const addCity = async (city: string): Promise<void> => {
    if (cities.includes(city)) {
      setError("City is already added.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await fetchWeatherData(city);
      setCities((prev) => [...prev, city]);
    } catch {
      setError("Failed to add city. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeCity = (city: string): void => {
    setCities((prev) => prev.filter((c) => c !== city));
    setWeatherData((prev) => {
      const updatedData = { ...prev };
      delete updatedData[city];
      return updatedData;
    });
  };

  const toggleUnit = (): void => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
      <CitySearch onAddCity={addCity} />
      <UnitToggle unit={unit === "metric" ? "C" : "F"} onToggle={toggleUnit} />

      {isLoading && <LoadingState />}
      {error && <ErrorHandling message={error} onRetry={() => setError(null)} />}

      <div>
        {cities.map((city) => {
          const weather = weatherData[city];
          return (
            weather && (
              <WeatherCard
              key={city}
              city={city}
              temperature={weather.main.temp}
              weatherCondition={weather.weather[0].main}
              weatherIcon={weather.weather[0].icon} 
              humidity={weather.main.humidity}
              windSpeed={weather.wind.speed}
              onRemove={() => removeCity(city)}
            />
            
            )
          );
        })}
      </div>
    </div>
  );
}
