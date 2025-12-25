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
import ProfileCompletion from "./components/ProfileCompletion/ProfileCompletion.tsx";
import FindJobs from "./pages/applicants/findJobs.tsx";
import SavedJobs from "./pages/applicants/savedJobs.tsx";
import EditProfile from "./pages/personalInfoSettings/index.tsx";

function App() {
	return (
		<>
			<Routes>
				{/* Main site */}
				<Route element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="profile-completion" element={<ProfileCompletion />} />
					<Route path="about" element={<About />} />
					<Route path="jobs" element={<FindJobs />} />
					<Route path="saved-jobs" element={<SavedJobs />} />
					<Route path="profile" element={<EditProfile />} />
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
