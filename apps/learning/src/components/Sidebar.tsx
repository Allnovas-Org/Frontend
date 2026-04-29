import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
	Settings,
	LogOut,
	Home,
	BookOpen,
	Bookmark,
	Users,
	Briefcase,
	DollarSign,
	MessageCircle,
	User,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import Logo from "../assets/allnova-logo.png";

interface SidebarProps {
	isOpen: boolean;
	onClose?: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleNavigation = (path: string) => {
		navigate(path);
		onClose?.();
	};

	const isActive = (path: string) => {
		if (path === "/dashboard" && location.pathname === "/dashboard") {
			return true;
		}
		if (path !== "/dashboard" && location.pathname.includes(path)) {
			return true;
		}
		return false;
	};
	return (
		<aside
			className={`fixed md:static w-64 h-screen bg-white flex flex-col justify-between p-4 transition-transform duration-300 z-40 ${
				isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
			}`}
		>
			<div>
				<div className="text-xl font-bold text-purple-600 mb-8 mx-auto">
					<img src={Logo} className="w-40" alt="Logo" />
				</div>

				<nav className="space-y-2">
					<SidebarItem icon={Home} label="Dashboard" active={isActive('/dashboard')} onClick={() => handleNavigation('/dashboard')} />
					<SidebarItem icon={Briefcase} label="Career Map" active={isActive('/dashboard/career-map')} onClick={() => handleNavigation('/dashboard/career-map')} />
					<SidebarItem icon={BookOpen} label="Course" active={isActive('/dashboard/course')} onClick={() => handleNavigation('/dashboard/course')} />
					<SidebarItem icon={Bookmark} label="Bookmark" active={isActive('/dashboard/bookmark')} onClick={() => handleNavigation('/dashboard/bookmark')} />
					<SidebarItem icon={Users} label="Community" active={isActive('/dashboard/community')} onClick={() => handleNavigation('/dashboard/community')} />
					<SidebarItem icon={Briefcase} label="Internship" active={isActive('/dashboard/internship')} onClick={() => handleNavigation('/dashboard/internship')} />
					<SidebarItem icon={DollarSign} label="Earning" active={isActive('/dashboard/earning')} onClick={() => handleNavigation('/dashboard/earning')} />
					<SidebarItem icon={MessageCircle} label="Message" active={isActive('/dashboard/message')} onClick={() => handleNavigation('/dashboard/message')} />
					<SidebarItem icon={User} label="Profile" active={isActive('/dashboard/profile')} onClick={() => handleNavigation('/dashboard/profile')} />
				</nav>
			</div>

			<div className="space-y-2">
				<SidebarItem icon={Settings} label="Settings" active={isActive('/dashboard/settings')} onClick={() => handleNavigation('/dashboard/settings')} />
				<SidebarItem icon={LogOut} label="Logout" onClick={() => handleNavigation('/')} />
			</div>
		</aside>
	);
};

export default Sidebar;
