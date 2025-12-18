import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default MainLayout;
