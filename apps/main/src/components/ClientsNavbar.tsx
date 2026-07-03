import React, { useState } from "react";
import logo from "../assets/allnova-logo-black.png";
import { Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Bell } from "lucide-react";
import SignupModal from "../pages/auth/SignupFlow/SignupModal";
import SignInModal from "../pages/auth/SignInFlow/SignInModal";
import { Link } from "react-router-dom";

const clientHeaderLinks = [
	{ title: "Messages", url: "/clients/messages" },
	{ title: "Post a Job", url: "/clients/post-a-job" },
	{ title: "Projects", url: "/clients/projects" },
	{ title: "Spotlight Talents", url: "/clients" },
];

const ClientNavbar: React.FC = () => {
	const [openMobileNav, setOpenMobileNav] = useState(false);

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

					<div className="inline-flex gap-4 items-center">
						
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
			</header>
		</>
	);
};

export default ClientNavbar;
