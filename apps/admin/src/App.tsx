
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Freelancers from "./pages/Freelancers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="freelancers" element={<Freelancers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
