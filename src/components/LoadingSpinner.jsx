"use client";
import React from "react";
import { HashLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-10 backdrop-blur-sm z-50000">
      <HashLoader color="#16a34a" size={80} />
    </div>
  );
};

export default LoadingSpinner;
