import React, { useState } from "react";
import logo from "../assets/allnova-logo-black.png";
import { Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SignupModal from "./SignupFlow/SignupModal";
import SignInModal from "./SignInFlow/SignInModal";
import { Link, useLocation } from "react-router-dom";

const headerLinks = [
	{ title: "Find Freelancers", url: "#finalCTASection" },
	{ title: "Services", url: "#nichesSection" },
	{ title: "Resources", url: "#resourcesSection" },
	{ title: "About Us", url: "#missionSection" },
	// offshore page route
	{ title: "Offshore Services", url: "/offshore", type: "route" },
];

const Navbar = () => {
	const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
	const [openMobileNav, setOpenMobileNav] = useState(false);

	const location = useLocation();
	const isHomePage = location.pathname === "/";

	const toggleMobileNav = () => {
		setOpenMobileNav(!openMobileNav);
	};

	// Scroll handler for homepage scroll links
	const handleNavClick = (url) => {
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
