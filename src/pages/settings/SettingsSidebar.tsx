import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
	PersonOutline,
	NotificationsOutlined,
	ShieldOutlined,
	CreditCardOutlined,
	TuneOutlined,
	AccountBalanceWalletOutlined,
} from "@mui/icons-material";

interface SidebarItem {
	label: string;
	path: string;
	icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
	{
		label: "Profile",
		path: "/settings",
		icon: <PersonOutline />,
	},
	{
		label: "Notifications",
		path: "/settings/notifications",
		icon: <NotificationsOutlined />,
	},
	{
		label: "Security",
		path: "/settings/security",
		icon: <ShieldOutlined />,
	},
	{
		label: "Billing",
		path: "/settings/billing",
		icon: <CreditCardOutlined />,
	},
	{
		label: "Preferences",
		path: "/settings/preferences",
		icon: <TuneOutlined />,
	},
	{
		label: "Withdraw",
		path: "/settings/withdraw",
		icon: <AccountBalanceWalletOutlined />,
	},
];

const SettingsSidebar: React.FC = () => {
	const location = useLocation();

	// Helper function to check if an item is active
	const isItemActive = (path: string) => {
		// For Profile (exact match)
		if (path === "/settings") {
			return location.pathname === "/settings";
		}

		// For other routes, check if the current path starts with the item's path
		// This handles nested routes properly
		return (
			location.pathname === path || location.pathname.startsWith(path + "/")
		);
	};

	// Find the index of the active item
	const activeIndex = sidebarItems.findIndex((item) => isItemActive(item.path));

	// Check if active item is one of the last two
	const isActiveInLastTwo = activeIndex >= sidebarItems.length - 2;

	return (
		<nav className="flex flex-col justify-center gap-0">
			{/* Vertical line connecting all items */}
			{sidebarItems.map((item, index) => {
				const isActive = isItemActive(item.path);

				// Determine if this connector should show horizontal line
				let showHorizontalLine = false;

				// Regular items: show horizontal line on the connector after active item
				if (isActive && index < sidebarItems.length - 1) {
					showHorizontalLine = true;
				}

				// Special handling for last two items
				if (isActiveInLastTwo) {
					// If active is second-to-last (Preferences)
					if (activeIndex === sidebarItems.length - 2) {
						// Show horizontal line on the connector after Preferences
						if (index === sidebarItems.length - 2) {
							showHorizontalLine = true;
						}
					}
					// If active is last (Withdraw)
					else if (activeIndex === sidebarItems.length - 1) {
						// Show horizontal line on the connector after Preferences
						// (this is the shared line between last two items)
						if (index === sidebarItems.length - 2) {
							showHorizontalLine = true;
						}
					}
				}

				return (
					<React.Fragment key={item.path}>
						<NavLink
							to={item.path}
							end={item.path === "/settings"}
							className={({ isActive: navIsActive }) =>
								`max-w-[150px] inline-flex items-end px-3 gap-2 py-1 rounded-lg transition-colors ${
									navIsActive
										? "bg-black text-white"
										: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
								}`
							}
						>
							{({ isActive: navIsActive }) => (
								<>
									<span className="lg:text-xl">{item.icon}</span>
									<span className="font-medium max-lg:hidden">
										{item.label}
									</span>
								</>
							)}
						</NavLink>
						<div className="flex flex-col items-center max-w-[150px]">
							{index < sidebarItems.length - 1 && (
								<>
									{/* Horizontal and vertical lines from active item to content */}
									<span className="shrink-0 bg-gray-300 w-0.5 h-8 inline-flex items-center">
										<div
											className={`lg:w-60 w-28 h-0.5 bg-gray-300 shrink-0 z-2 ${
												showHorizontalLine ? "" : "hidden"
											}`}
										/>
									</span>
								</>
							)}
						</div>
					</React.Fragment>
				);
			})}
		</nav>
	);
};

export default SettingsSidebar;
