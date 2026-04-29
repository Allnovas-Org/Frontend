import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }: { children?: React.ReactNode } = {}) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleMenuToggle = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const handleCloseSidebar = () => {
		setSidebarOpen(false);
	};

	return (
		<div className="flex h-screen bg-gray-50">
			{/* Mobile overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
					onClick={handleCloseSidebar}
				/>
			)}

			<Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

			<div className="flex flex-col flex-1 overflow-hidden w-full md:w-auto">
				<Navbar onMenuToggle={handleMenuToggle} />

				<main className="flex-1 overflow-y-auto p-4 md:p-6">
					{children || <Outlet />}
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
