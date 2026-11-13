
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Freelancers from "./pages/Freelancers";
import RecruitersClients from "./pages/RecruitersClients";
import RecruitersCompanies from "./pages/RecruitersCompanies";
import JobVacancy from "./pages/JobVacancy";
import AvailableJob from "./pages/AvailableJob";

import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Applications from "./pages/Applications";
import CourseInternshipPayments from "./pages/CourseInternshipPayments";
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
<Route path="job-vacancy" element={<JobVacancy />} />
<Route path="available-job" element={<AvailableJob />} />

<Route path="projects" element={<Projects />} />
<Route path="projects/:id" element={<ProjectDetails />} />

<Route path="applications" element={<Applications />} />
<Route path="course-payments" element={<CourseInternshipPayments />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
