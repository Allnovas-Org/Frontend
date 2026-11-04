
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Freelancers from "./pages/Freelancers";
import RecruitersClients from "./pages/RecruitersClients";
import RecruitersCompanies from "./pages/RecruitersCompanies";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="freelancers" element={<Freelancers />} />
          
<Route path="recruiters-clients" element={<RecruitersClients />} />
<Route path="recruiters-companies" element={<RecruitersCompanies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
