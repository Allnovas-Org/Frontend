import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout: React.FC = () => (
	<>
		<Navbar />
		<Outlet />
	</>
);

export default MainLayout;
