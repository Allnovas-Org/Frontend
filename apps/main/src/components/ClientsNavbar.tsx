import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/allnova-logo-black.png";
import { Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Bell } from "lucide-react";
import SignupModal from "../pages/auth/SignupFlow/SignupModal";
import SignInModal from "../pages/auth/SignInFlow/SignInModal";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import UserDropdown from "../pages/applicants/UserDropdown";
import NotificationModal from "../pages/clients/Notifications/modals/NotificationModal";
import user from "../assets/applicants/user.png";
import { useClientProfilePhoto } from "../hooks/useClientProfilePhoto";

const clientHeaderLinks = [
	{ title: "Messages", url: "/clients/messages" },
	{ title: "Post a Job", url: "/clients/post-a-job" },
	{ title: "Projects", url: "/clients/projects" },
	{ title: "Spotlight Talents", url: "/clients" },
];

const ClientNavbar: React.FC = () => {
	const [openMobileNav, setOpenMobileNav] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const userBtnRef = useRef<HTMLButtonElement>(null);
	const currentUser = useAuthStore((s) => s.user);
	const currentUserId = currentUser?.id;
	const currentUserType = currentUser?.userType;
	const currentUserAvatar = currentUser?.avatar;
	const clientUserId =
		currentUserType === "Client" ? currentUserId : undefined;
	const { verification, photo } = useClientProfilePhoto(
		clientUserId,
		currentUserAvatar,
	);
	const [clientPhoto, setClientPhoto] = useState<string | null>(null);
	const photoBlob = photo.data;

	useEffect(() => {
		if (!photoBlob) {
			setClientPhoto(null);
			return;
		}
		const objectUrl = URL.createObjectURL(photoBlob);
		setClientPhoto(objectUrl);
		return () => URL.revokeObjectURL(objectUrl);
	}, [photoBlob]);

	useEffect(() => {
		const error = verification.error || photo.error;
		if (!error) return;
		const failure = error as { status?: number };
		console.error("Could not load the saved client profile photo.", {
			status: failure.status,
		});
	}, [photo.error, verification.error]);

	const avatarFallback = [
		currentUser?.firstName?.[0],
		currentUser?.lastName?.[0],
	]
		.filter(Boolean)
		.join("")
		.toUpperCase();

	const avatarSrc =
		currentUserType === "Client"
			? clientPhoto
			: currentUser?.avatar || user;
	const avatarAlt = currentUser
		? `${currentUser.firstName} ${currentUser.lastName}`
		: "User";
	const renderAvatar = (className: string) =>
		avatarSrc ? (
			<img src={avatarSrc} alt={avatarAlt} className={className} />
		) : (
			<span
				className={`${className} flex items-center justify-center bg-gray-100 text-gray-600 text-xs font-semibold`}
				role="img"
				aria-label="Profile photo unavailable"
			>
				{avatarFallback}
			</span>
		);

	const toggleMobileNav = () => {
		setOpenMobileNav(!openMobileNav);
	};

	return (
		<>
			<header className="bg-white max-md:px-2 p-4 w-full flex justify-center">
				{/* Desktop Navigation */}
				<nav className="max-w-6xl max-lg:text-xs w-full max-md:hidden inline-flex items-center justify-between">
					<div className="w-[10%] cursor-default">
						<img src={logo} alt="AllNova Logo" className="w-full" />
					</div>

					<ul className="inline-flex space-x-12 max-lg:space-x-6">
						{clientHeaderLinks.map((link) => (
							<li key={link.title} className="cursor-pointer">
								<Link
									to={link.url}
									className="text-black hover:text-gray-500 transition"
								>
									{link.title}
								</Link>
							</li>
						))}
					</ul>

					<div className="inline-flex gap-4 items-center relative">
						<button
							type="button"
							className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 focus:outline-none"
							aria-label="Open notifications"
							onClick={() => setIsNotificationOpen(true)}
						>
							<Bell className="w-4 h-4 text-gray-500" />
						</button>
						<button
							type="button"
							className="focus:outline-none"
							ref={userBtnRef}
							onClick={() => setIsDropdownOpen((v) => !v)}
							aria-label="Open user menu"
						>
							{renderAvatar(
								"w-8 h-8 rounded-full object-cover border border-gray-300",
							)}
						</button>
						<UserDropdown
							open={isDropdownOpen}
							anchorRef={userBtnRef}
							onClose={() => setIsDropdownOpen(false)}
							avatarSrc={avatarSrc}
							avatarFallback={avatarFallback}
						/>
					</div>
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

					<div className="cursor-default">
						<img src={logo} alt="AllNova Logo" className="w-[120px]" />
					</div>

					<div className="inline-flex gap-3 items-center relative">
						<button
							type="button"
							className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 focus:outline-none"
							aria-label="Open notifications"
							onClick={() => setIsNotificationOpen(true)}
						>
							<Bell className="w-4 h-4 text-gray-500" />
						</button>
						<button
							type="button"
							className="focus:outline-none"
							onClick={() => setIsDropdownOpen((v) => !v)}
							aria-label="Open user menu"
						>
							{renderAvatar(
								"w-8 h-8 rounded-full object-cover border border-gray-300",
							)}
						</button>
					</div>
				</nav>

				{/* Mobile Drawer */}
				<Drawer anchor="left" open={openMobileNav} onClose={toggleMobileNav}>
					<div className="w-64 p-4 flex flex-col gap-6">
						<div className="cursor-default">
							<img src={logo} alt="AllNova Logo" className="w-4/5 mx-auto" />
						</div>
						<ul className="flex flex-col space-y-4">
							{clientHeaderLinks.map((link) => (
								<li key={link.title}>
									<Link
										to={link.url}
										onClick={toggleMobileNav}
										className="text-black font-medium hover:text-gray-500 transition"
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</Drawer>

				{/* Notifications */}
				<NotificationModal
					open={isNotificationOpen}
					onClose={() => setIsNotificationOpen(false)}
				/>
			</header>
		</>
	);
};

export default ClientNavbar;
