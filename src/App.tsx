import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/home.tsx";
import { About } from "./pages/about.tsx";

 
// Offshore Pages
import Offshore from "./pages/offshore.tsx";
import OffshoreNavbar from "./components/offshore/OffshoreNavbar.tsx";
import OffshoreServices from "./pages/offshoreServices.tsx";
import OffshoreContact from "./pages/offshoreContact.tsx";




function App() {
  return (
    <>
      <Routes>

        {/* Main Website Layout (shows Main Navbar) */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
            </>
          }
        />

        {/* Offshore Layout (shows ONLY Offshore Navbar) */}
        <Route
          path="/offshore"
          element={
            <>
              <OffshoreNavbar />
              <Offshore />
            </>
          }
        />

        {/* Offshore Services Layout */}
        <Route
          path="/offshore/services"
          element={
            <>
              <OffshoreNavbar />
              <OffshoreServices />
            </>
          }
        />

        {/* Offshore Contact Layout */}
        <Route
          path="/offshore/contact"
          element={
            <>
              <OffshoreNavbar />
              <OffshoreContact />
            </>
          }
        />

      </Routes>
    </>
  );
}

export default App;
