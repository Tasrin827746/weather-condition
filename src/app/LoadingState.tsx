// components/LoadingState.tsx
import React from "react";

const LoadingState: React.FC = () => {
  return (
    <div className="p-4 text-center">
      <p className="text-gray-500 animate-pulse">Loading...</p>
    </div>
  );
};

export default LoadingState;
