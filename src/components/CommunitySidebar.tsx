import React, { useState } from "react";
import {
	Home,
	People,
	Work,
	Bookmark,
	Group,
	Shield,
	ExpandMore,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";

interface SidebarNavItem {
	id: string;
	label: string;
	icon: React.ReactNode;
	path: string;
	hasSubmenu?: boolean;
	submenuItems?: { id: string; label: string; path: string }[];
}

interface CommunitySidebarProps {
	activeTab: string;
	onTabChange: (tabId: string) => void;
}

const CommunitySidebar: React.FC<CommunitySidebarProps> = ({
	activeTab,
	onTabChange,
}) => {
	const [categoriesOpen, setCategoriesOpen] = useState(false);

	const navItems: SidebarNavItem[] = [
		{
			id: "dashboard",
			label: "Dashboard",
			icon: <Home sx={{ fontSize: 24 }} />,
			path: "/community/dashboard",
		},
		{
			id: "community",
			label: "Community",
			icon: <People sx={{ fontSize: 24 }} />,
			path: "/community",
		},
		{
			id: "categories",
			label: "Categories",
			icon: <Work sx={{ fontSize: 24 }} />,
			path: "/community/categories",
		},
		{
			id: "saved-posts",
			label: "Saved Posts",
			icon: <Bookmark sx={{ fontSize: 24 }} />,
			path: "/community/saved-posts",
		},
		{
			id: "followers",
			label: "Followers",
			icon: <Group sx={{ fontSize: 24 }} />,
			path: "/community/followers",
		},
		{
			id: "community-hub",
			label: "Community Hub",
			icon: <Shield sx={{ fontSize: 24 }} />,
			path: "/community/hub",
		},
	];

	const handleNavClick = (item: SidebarNavItem) => {
		if (item.hasSubmenu) {
			setCategoriesOpen(!categoriesOpen);
		} else {
			onTabChange(item.id);
		}
	};

	return (
		<div className="w-full bg-white border-r border-gray-200 min-h-screen p-6">
			<nav className="space-y-2">
				{navItems.map((item) => (
					<div key={item.id}>
						<button
							onClick={() => handleNavClick(item)}
							className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
								activeTab === item.id
									? "bg-purple-50 text-[#6A0DAD]"
									: "text-gray-700 hover:bg-gray-50"
							}`}
						>
							<div className="flex items-center gap-3">
								<span
									className={
										activeTab === item.id ? "text-[#6A0DAD]" : "text-gray-600"
									}
								>
									{item.icon}
								</span>
								<span className="font-medium">{item.label}</span>
							</div>
							{item.hasSubmenu && (
								<ExpandMore
									sx={{
										fontSize: 20,
										transform: categoriesOpen
											? "rotate(180deg)"
											: "rotate(0deg)",
										transition: "transform 0.3s",
									}}
								/>
							)}
						</button>

						{/* Submenu */}
						{item.hasSubmenu && (
							<Collapse in={categoriesOpen}>
								<div className="ml-12 mt-2 space-y-1">
									{item.submenuItems?.map((subItem) => (
										<button
											key={subItem.id}
											onClick={() => onTabChange(subItem.id)}
											className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
												activeTab === subItem.id
													? "bg-purple-50 text-[#6A0DAD] font-medium"
													: "text-gray-600 hover:bg-gray-50"
											}`}
										>
											{subItem.label}
										</button>
									))}
								</div>
							</Collapse>
						)}

						{/* Active Indicator Line */}
						{activeTab === item.id && (
							<div className="absolute right-0 w-1 h-12 bg-[#6A0DAD] rounded-l-full -mt-12" />
						)}
					</div>
				))}
			</nav>
		</div>
	);
};

export default CommunitySidebar;
