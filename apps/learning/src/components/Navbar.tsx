import React from "react";
import { Bell, Menu, Settings } from "lucide-react";

interface NavbarProps {
	onMenuToggle?: () => void;
}

const Navbar = ({ onMenuToggle }: NavbarProps) => {
	return (
		<header className="flex items-center justify-between px-4 md:px-6 py-4 bg-white">
			<button
				onClick={onMenuToggle}
				className="md:hidden p-2 rounded-lg hover:bg-gray-100"
			>
				<Menu size={20} />
			</button>

			<div className="flex-1 max-w-lg ml-2 md:ml-0">
				<input
					type="text"
					placeholder="Search lesson..."
					className="w-full px-4 py-2 border border-neutral-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
				/>
			</div>

			<div className="flex items-center gap-4 ml-6">
				<button className="p-2 rounded-full hover:bg-gray-100">
					<Bell size={20} />
				</button>

				<div className="w-8 h-8 rounded-full bg-gray-300" />
				<button className="p-2 rounded-full hover:bg-gray-100">
					<Settings size={20} />
				</button>
			</div>
		</header>
	);
};

export default Navbar;
