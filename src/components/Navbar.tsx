import React, { useState, useRef } from "react";
import logo from "../assets/allnova-logo-black.png";
import user from "../assets/applicants/user.png";
import { Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Bell } from "lucide-react";
import SignupModal from "./SignupFlow/SignupModal";
import SignInModal from "./SignInFlow/SignInModal";
import { Link, useLocation } from "react-router-dom";
import ActivitiesDrawer from "../pages/applicants/ActivitiesDrawer";
import UserDropdown from "../pages/applicants/UserDropdown";

const headerLinks = [
	{ title: "Find Freelancers", url: "/jobs", type: "route" },
	{ title: "Services", url: "#nichesSection" },
	{ title: "Resources", url: "#resourcesSection" },
	{ title: "About Us", url: "#missionSection" },
	{ title: "Offshore Services", url: "/offshore", type: "route" },
];

const loggedInLinks = [
	{ title: "Find Jobs", url: "/jobs", type: "route" },
	{ title: "Work History", url: "/work-history", type: "route" },
	{ title: "Saved Jobs", url: "/saved-jobs", type: "route" },
	{ title: "Messages", url: "/message", type: "route" },
	{ title: "Community", url: "#", type: "route" },
];

const Navbar = () => {
	const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
	const [openMobileNav, setOpenMobileNav] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);
	const userBtnRef = useRef<HTMLButtonElement>(null!);

	const location = useLocation();
	const isHomePage = location.pathname === "/";
	const isMainContent =
		location.pathname === "/jobs" ||
		location.pathname === "/saved-jobs" ||
		location.pathname === "/settings";

	const toggleMobileNav = () => {
		setOpenMobileNav(!openMobileNav);
	};

	// Scroll handler for homepage scroll links
	const handleNavClick = (url: string) => {
		if (!isHomePage || !url.startsWith("#")) return;

		const element = document.querySelector(url);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}

		if (openMobileNav) {
			setOpenMobileNav(false);
		}
	};

	// Sample notifications data
	type Notification = {
		id: string;
		icon: React.ReactNode;
		title: string;
		subtitle: string;
		timestamp: Date;
	};

	const notifications: Notification[] = [
		{
			id: "1",
			icon: (
				<span className="w-8 h-8 flex items-center justify-center rounded-full border border-red-200">
					<Bell className="w-5 h-5 text-red-500" />
				</span>
			),
			title: "System Alert",
			subtitle: "A recent sign-in to your account from an unknown device.",
			timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
		},
	];

	// Helper functions for notifications
	function groupNotificationsByDate(
		notifications: Notification[],
	): Record<string, Notification[]> {
		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() - 1);

		function isSameDay(d1: Date, d2: Date): boolean {
			return (
				d1.getFullYear() === d2.getFullYear() &&
				d1.getMonth() === d2.getMonth() &&
				d1.getDate() === d2.getDate()
			);
		}

		const grouped: Record<string, Notification[]> = {
			Today: [],
			Yesterday: [],
		};

		notifications.forEach((n: Notification) => {
			if (isSameDay(n.timestamp, today)) {
				grouped.Today.push(n);
			} else if (isSameDay(n.timestamp, yesterday)) {
				grouped.Yesterday.push(n);
			}
		});

		return grouped;
	}

	function getTimeAgo(date: Date): string {
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
	}

	// Prepare activities for drawer
	type Activity = {
		id: string;
		icon: React.ReactNode;
		title: string;
		subtitle: string;
		time: string;
	};

	const activities: Record<string, Activity[]> = {};
	const grouped = groupNotificationsByDate(notifications);
	Object.entries(grouped).forEach(([key, arr]) => {
		activities[key] = arr.map((n: Notification) => ({
			id: n.id,
			icon: n.icon,
			title: n.title,
			subtitle: n.subtitle,
			time: getTimeAgo(n.timestamp),
		}));
	});

	// Handle drawer animation
	React.useEffect(() => {
		if (isDrawerOpen) {
			setDrawerVisible(true);
		} else {
			const timeout = setTimeout(() => setDrawerVisible(false), 300);
			return () => clearTimeout(timeout);
		}
	}, [isDrawerOpen]);

	return (
		<>
			<header className="bg-white p-4 w-full flex justify-center">
				{/* Desktop Navigation */}
				<nav className="max-w-6xl max-lg:text-xs w-full max-md:hidden inline-flex items-center justify-between">
					<Link to="/" className="w-[10%]">
						<img src={logo} alt="AllNova Logo" className="w-full" />
					</Link>

					{isHomePage ? (
						<>
							<ul className="inline-flex space-x-12 max-lg:space-x-6">
								{headerLinks.map((link) => (
									<li key={link.title} className="cursor-pointer">
										{link.type === "route" ? (
											<Link
												to={link.url}
												className="text-black hover:text-gray-500 transition"
											>
												{link.title}
											</Link>
										) : (
											<span
												onClick={() => handleNavClick(link.url)}
												className="text-black hover:text-gray-500 transition"
											>
												{link.title}
											</span>
										)}
									</li>
								))}
							</ul>

							<div className="inline-flex gap-x-4 items-center">
								<button
									onClick={() => setIsSignInModalOpen(true)}
									className="bg-transparent text-primary px-[1.2rem] py-[0.45rem] rounded-md hover:text-primary/80 transition"
								>
									Sign in
								</button>
								<button
									onClick={() => setIsSignupModalOpen(true)}
									className="bg-primary text-white px-[1.2rem] py-[0.45rem] rounded-full hover:bg-primary/70 transition"
								>
									Join
								</button>
							</div>
						</>
					) : isMainContent ? (
						<>
							<ul className="inline-flex space-x-12 max-lg:space-x-6">
								{loggedInLinks.map((link) => (
									<li key={link.title} className="cursor-pointer">
										{link.type === "route" ? (
											<Link
												to={link.url}
												className="text-black hover:text-gray-500 transition"
											>
												{link.title}
											</Link>
										) : (
											<span
												onClick={() => handleNavClick(link.url)}
												className="text-black hover:text-gray-500 transition"
											>
												{link.title}
											</span>
										)}
									</li>
								))}
							</ul>

							{/* Notifications & User Section */}
							<div className="flex items-center gap-3 relative">
								{/* Bell Icon */}
								<button
									type="button"
									className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white focus:outline-none hover:bg-gray-50 transition"
									aria-label="Open notifications"
									onClick={() => setIsDrawerOpen(true)}
									style={{ position: "relative", zIndex: 52 }}
								>
									<Bell className="w-4 h-4 text-gray-500" />
								</button>

								{/* User Dropdown */}
								<button
									type="button"
									className="focus:outline-none"
									ref={userBtnRef}
									onClick={() => setIsDropdownOpen((v) => !v)}
									aria-label="Open user menu"
									style={{ position: "relative", zIndex: 51 }}
								>
									<img
										src={user}
										alt="User"
										className="w-8 h-8 rounded-full object-cover border border-gray-300"
									/>
								</button>

								<UserDropdown
									open={isDropdownOpen}
									anchorRef={userBtnRef}
									onClose={() => setIsDropdownOpen(false)}
								/>

								{/* Activities Drawer */}
								{drawerVisible && (
									<ActivitiesDrawer
										open={isDrawerOpen}
										onClose={() => setIsDrawerOpen(false)}
										activities={activities}
									/>
								)}
							</div>
						</>
					) : (
						<div className="flex-1 flex justify-end"></div>
					)}
				</nav>

				{/* Mobile Navigation */}
				<nav className="max-w-6xl w-full hidden max-md:flex items-center justify-between">
					<button
						onClick={toggleMobileNav}
						className="text-3xl font-bold"
						aria-label="Toggle mobile menu"
						aria-expanded={openMobileNav}
					>
						<MenuIcon />
					</button>

					<Link to="/">
						<img src={logo} alt="AllNova Logo" className="w-[120px]" />
					</Link>

					{isHomePage ? (
						<button
							onClick={() => setIsSignupModalOpen(true)}
							className="bg-transparent text-primary px-[1.2rem] py-[0.45rem] rounded-md hover:text-primary/80 transition"
						>
							Join
						</button>
					) : (
						<div className="w-[1.2rem]"></div>
					)}
				</nav>

				{/* Mobile Drawer (Home Only) */}
				{isHomePage && (
					<Drawer anchor="left" open={openMobileNav} onClose={toggleMobileNav}>
						<div className="w-64 p-4 flex flex-col justify-between h-full pb-8">
							<ul className="flex flex-col space-y-6">
								<button
									onClick={() => handleNavClick("#home")}
									className="w-4/5 mx-auto"
								>
									<img src={logo} alt="AllNova Logo" className="w-full" />
								</button>

								{headerLinks.map((link) => (
									<li key={link.title} className="cursor-pointer">
										{link.type === "route" ? (
											<Link
												to={link.url}
												onClick={() => setOpenMobileNav(false)}
												className="text-black font-medium hover:text-gray-500 transition"
											>
												{link.title}
											</Link>
										) : (
											<span
												onClick={() => handleNavClick(link.url)}
												className="text-black font-medium hover:text-gray-500 transition"
											>
												{link.title}
											</span>
										)}
									</li>
								))}
							</ul>

							<div className="flex flex-col gap-y-3">
								<button
									onClick={() => {
										setIsSignInModalOpen(true);
										setOpenMobileNav(false);
									}}
									className="bg-transparent text-primary px-[1.2rem] py-[0.45rem] rounded-md hover:text-primary/80 transition border border-primary"
								>
									Sign in
								</button>

								<button
									onClick={() => {
										setIsSignupModalOpen(true);
										setOpenMobileNav(false);
									}}
									className="bg-primary text-white px-[1.2rem] py-[0.45rem] rounded-full hover:bg-primary/70 transition"
								>
									Join
								</button>
							</div>
						</div>
					</Drawer>
				)}
			</header>

			{/* Modals */}
			<SignupModal
				isOpen={isSignupModalOpen}
				onClose={() => setIsSignupModalOpen(false)}
			/>

			<SignInModal
				isOpen={isSignInModalOpen}
				onClose={() => setIsSignInModalOpen(false)}
			/>
		</>
	);
};

export default Navbar;
