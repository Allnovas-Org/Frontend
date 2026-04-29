import React from "react";

interface SidebarItemProps {
	icon: any;
	label: string;
	active?: boolean;
	onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: SidebarItemProps) => {
	return (
		<div
			onClick={onClick}
			className={`flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg cursor-pointer transition text-sm md:text-base ${
				active ? "bg-purple-600 text-white" : "text-gray-600 hover:bg-gray-100"
			}`}
		>
			<Icon size={18} className="flex-shrink-0" />
			<span className="font-medium">{label}</span>
		</div>
	);
};

export default SidebarItem;
