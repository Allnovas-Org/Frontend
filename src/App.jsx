import React from "react";
import MainLayout from "./layout/MainLayout.tsx";
import ApplicantsLayout from "./layout/ApplicantsLayout";
import Navbar from "./components/Navbar";
import ApplicantsNavbar from "./components/ApplicantsNavbar";
import "./index.css";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.tsx";
import { About } from "./pages/about.tsx";
import FindJobs from "./pages/applicants/findJobs";
import SavedJobs from "./pages/applicants/savedJobs";
import { SavedJobsProvider } from "./store/SavedJobsProvider.tsx";

// function App() {
//   return (
//     <>
//       <Navbar />

//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/about' element={<About />} />
//         <Route
//           path='/applicants/find-jobs'
//           element={
//             <>
//               <ApplicantsNavbar />
//               <FindJobs />
//             </>
//           }
//         />
//       </Routes>
//     </>
//   );
// }
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Route>
      <Route
        element={
          <SavedJobsProvider>
            <ApplicantsLayout />
          </SavedJobsProvider>
        }
      >
        <Route path='/applicants/find-jobs' element={<FindJobs />} />
        <Route path='/applicants/saved-jobs' element={<SavedJobs />} />
      </Route>
    </Routes>
  );
}

export default App;
