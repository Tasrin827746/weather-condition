"use client";

import React from "react";

interface ErrorHandlingProps {
  message: string;
  onRetry: () => void;
}

const ErrorHandling: React.FC<ErrorHandlingProps> = ({ message, onRetry }) => {
  return (
    <div className="p-4 text-center">
      <p className="text-red-500">{message}</p>
      <button
        onClick={onRetry}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorHandling;
