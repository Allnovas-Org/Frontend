import React from "react";
import { Outlet } from "react-router-dom";
import SettingsSidebar from "../pages/settings/SettingsSidebar";

const SettingsLayout: React.FC = () => {
	return (
		<div className="w-full max-w-[1032px] mx-auto px-4 py-8">
			<div className="flex flex-col gap-8">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-semibold text-gray-900 mb-2">
						Account Settings
					</h1>
					<p className="text-gray-500 text-base">
						Manage your preferences, notification and account security here
					</p>
				</div>

				{/* Content: Sidebar + Page */}
				<div className="inline-flex lg:gap-12 gap-6">
					{/* Sidebar */}
					<div className="w-fit max-w-[380px] shrink-0">
						<SettingsSidebar />
					</div>

					{/* Main Content */}
					<div className="w-full max-w-[948px] bg-white z-10 h-[400px] rounded-lg lg:border border-gray-300 p-3">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SettingsLayout;
