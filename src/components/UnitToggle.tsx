import React from "react";

interface UnitToggleProps {
  unit: "C" | "F";
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <span className={`text-sm ${unit === "C" ? "font-semibold text-blue-500" : "text-gray-500"}`}>
        °C
      </span>
      <label className="relative inline-block w-14 h-7">
        <input
          type="checkbox"
          checked={unit === "F"}
          onChange={onToggle}
          className="opacity-0 w-0 h-0"
        />
        <span className="block w-full h-full bg-gray-500 rounded-full cursor-pointer"></span>
        <span
          className={`absolute top-0.5 left-0.5 w-6 h-6 bg-blue-500 rounded-full shadow-md transition-transform duration-300 ${
            unit === "F" ? "translate-x-7" : ""
          }`}
        ></span>
      </label>
      <span className={`text-sm ${unit === "F" ? "font-semibold text-blue-500" : "text-gray-500"}`}>
        °F
      </span>
    </div>
  );
};

export default UnitToggle;
