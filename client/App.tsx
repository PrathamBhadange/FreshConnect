import "./global.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Test with minimal app first
const TestApp = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">FreshConnect</h1>
      <p className="text-muted-foreground mt-2">Testing minimal app...</p>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TestApp />} />
      <Route path="*" element={<TestApp />} />
    </Routes>
  </BrowserRouter>
);

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
}
