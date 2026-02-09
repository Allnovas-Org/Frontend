import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import ClientsNavbar from "../components/ClientsNavbar";

const ClientsLayout: React.FC = () => (
	<>
		<ClientsNavbar />
		<Outlet />
	</>
);

export default ClientsLayout;
