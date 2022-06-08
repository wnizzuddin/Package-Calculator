import React from "react";
import { Routes } from "react-router-dom";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<CalculatorPage />} />
    </Routes>
  );
};
