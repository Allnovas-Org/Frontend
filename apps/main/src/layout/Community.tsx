import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import CommunitySidebar from "../components/CommunitySidebar";
import { Menu, Close } from "@mui/icons-material";
import { IconButton, Drawer } from "@mui/material";

const CommunityLayout = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	// Get active tab from current route
	const getActiveTab = () => {
		const path = location.pathname;
		if (path.includes("/dashboard")) return "dashboard";
		if (path.includes("/categories/tech")) return "tech";
		if (path.includes("/categories/design")) return "design";
		if (path.includes("/categories/business")) return "business";
		if (path.includes("/categories")) return "categories";
		if (path.includes("/saved-posts")) return "saved-posts";
		if (path.includes("/followers")) return "followers";
		if (path.includes("/hub")) return "community-hub";
		if (path === "/community" || path === "/community/") return "community";
		return "dashboard";
	};

	const handleTabChange = (tabId: string) => {
		const routes: { [key: string]: string } = {
			dashboard: "/community/dashboard",
			community: "/community",
			categories: "/community/categories",
			tech: "/community/categories/tech",
			design: "/community/categories/design",
			business: "/community/categories/business",
			"saved-posts": "/community/saved-posts",
			followers: "/community/followers",
			"community-hub": "/community/hub",
		};
		navigate(routes[tabId] || "/community");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Mobile Header */}
			<div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between sticky top-0 z-50">
				<h2 className="text-xl font-bold text-gray-900">Community</h2>
				<IconButton
					onClick={() => setMobileMenuOpen(true)}
					sx={{ color: "#374151" }}
				>
					<Menu />
				</IconButton>
			</div>

			<div className="flex">
				{/* Desktop Sidebar */}
				<aside className="hidden lg:block w-64 fixed left-0 top-0 h-screen overflow-y-auto">
					<CommunitySidebar
						activeTab={getActiveTab()}
						onTabChange={handleTabChange}
					/>
				</aside>

				{/* Mobile Drawer */}
				<Drawer
					anchor="left"
					open={mobileMenuOpen}
					onClose={() => setMobileMenuOpen(false)}
					PaperProps={{
						sx: { width: 280 },
					}}
				>
					<div className="flex items-center justify-between p-4 border-b border-gray-200">
						<h2 className="text-xl font-bold text-gray-900">Menu</h2>
						<IconButton
							onClick={() => setMobileMenuOpen(false)}
							sx={{ color: "#374151" }}
						>
							<Close />
						</IconButton>
					</div>
					<CommunitySidebar
						activeTab={getActiveTab()}
						onTabChange={(tab) => {
							handleTabChange(tab);
							setMobileMenuOpen(false);
						}}
					/>
				</Drawer>

				{/* Main Content - Render nested routes */}
				<main className="flex-1 lg:ml-64 p-6 lg:p-8">
					<div className="max-w-7xl mx-auto">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};

export default CommunityLayout;
