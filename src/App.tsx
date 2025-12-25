import React from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import ApplicantsLayout from "./layout/ApplicantsLayout";

// Public pages
import Home from "./pages/home";
import { About } from "./pages/about";
import ProfileCompletion from "./components/ProfileCompletion/ProfileCompletion";

// Applicants pages
import FindJobs from "./pages/applicants/findJobs";
import SavedJobs from "./pages/applicants/savedJobs";
import WorkHistory from "./pages/applicants/WorkHistory";
import EditProfile from "./pages/personalInfoSettings/index.tsx";
// import Messages from "./pages/applicants/Messages";

// Offshore pages
import Offshore from "./pages/offshore";
import OffshoreNavbar from "./pages/offshore/OffshoreNavbar";
import OffshoreServices from "./pages/offshoreServices";
import OffshoreContact from "./pages/offshoreContact";

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC WEBSITE ================= */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="profile-completion" element={<ProfileCompletion />} />
        <Route path="jobs" element={<FindJobs />} />
        <Route path="saved-jobs" element={<SavedJobs />} />
        <Route path="profile" element={<EditProfile />} />
      </Route>

      {/* ================= APPLICANTS DASHBOARD ================= */}
      <Route path="applicants" element={<ApplicantsLayout children={undefined} />}>
        <Route path="find-jobs" element={<FindJobs />} />
        <Route path="saved-jobs" element={<SavedJobs />} />
        <Route path="work-history/*" element={<WorkHistory />} />
      </Route>

      {/* ================= OFFSHORE PAGES ================= */}
      <Route
        path="offshore"
        element={
          <>
            <OffshoreNavbar />
            <Offshore />
          </>
        }
      />

      <Route
        path="offshore/services"
        element={
          <>
            <OffshoreNavbar />
            <OffshoreServices />
          </>
        }
      />

      <Route
        path="offshore/contact"
        element={
          <>
            <OffshoreNavbar />
            <OffshoreContact />
          </>
        }
      />
    </Routes>
  );
}

export default App;