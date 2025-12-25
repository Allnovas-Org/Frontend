import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.tsx";
import MainLayout from "./layout/MainLayout.tsx";

import Home from "./pages/home.tsx";
import { About } from "./pages/about.tsx";

// Offshore Pages
import Offshore from "./pages/offshore.tsx";
import OffshoreNavbar from "./pages/offshore/OffshoreNavbar.tsx";
import OffshoreServices from "./pages/offshoreServices.tsx";
import OffshoreContact from "./pages/offshoreContact.tsx";
import ProfileCompletion from "./pages/auth/ProfileCompletion/ProfileCompletion.tsx";
import SettingsLayout from "./layout/SettingsLayout.tsx";

import ProfileSettings from "./pages/settings/ProfileSettings.tsx";
import PreferencesSettings from "./pages/settings/PreferencesSettings.tsx";
import NotificationsSettings from "./pages/settings/NotificationsSettings.tsx";
import SecuritySettings from "./pages/settings/SecuritySettings.tsx";

function App() {
	return (
		<>
			<Routes>
				{/* Main site */}
				<Route element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="profile-completion" element={<ProfileCompletion />} />
					<Route path="about" element={<About />} />
					<Route path="settings" element={<SettingsLayout />}>
						<Route index element={<ProfileSettings />} />
						<Route path="notifications" element={<NotificationsSettings />} />
						<Route path="security" element={<SecuritySettings />} />
						<Route path="billing" element={<div>Billing Settings Page</div>} />
						<Route path="preferences" element={<PreferencesSettings />} />
						<Route
							path="withdraw"
							element={<div>Withdraw Settings Page</div>}
						/>
					</Route>
				</Route>

				{/* Offshore Layout (shows ONLY Offshore Navbar) */}
				<Route
					path="/offshore"
					element={
						<>
							<OffshoreNavbar />
							<Offshore />
						</>
					}
				/>

				{/* Offshore Services Layout */}
				<Route
					path="/offshore/services"
					element={
						<>
							<OffshoreNavbar />
							<OffshoreServices />
						</>
					}
				/>

				{/* Offshore Contact Layout */}
				<Route
					path="/offshore/contact"
					element={
						<>
							<OffshoreNavbar />
							<OffshoreContact />
						</>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
