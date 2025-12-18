import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.tsx";
import Home from "./pages/home.tsx";
import { About } from "./pages/about.tsx";

// Offshore Pages
import Offshore from "./pages/offshore.tsx";
import OffshoreNavbar from "./components/offshore/OffshoreNavbar.tsx";
import OffshoreServices from "./pages/offshoreServices.tsx";
import OffshoreContact from "./pages/offshoreContact.tsx";
import ProfileCompletion from "./pages/auth/ProfileCompletion/ProfileCompletion.tsx";
import SettingsLayout from "./layout/SettingsLayout.tsx";
import MainLayout from "./layout/MainLayout.tsx";

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
						<Route index element={<div>Profile Settings Page</div>} />
						<Route
							path="notifications"
							element={<div>Notifications Settings Page</div>}
						/>
						<Route
							path="security"
							element={<div>Security Settings Page</div>}
						/>
						<Route path="billing" element={<div>Billing Settings Page</div>} />
						<Route
							path="preferences"
							element={<div>Preferences Settings Page</div>}
						/>
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
