import React from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import ApplicantsLayout from "./layout/ApplicantsLayout";

// Public pages
import Home from "./pages/home";
import { About } from "./pages/about";

// Applicants pages
import FindJobs from "./pages/applicants/findJobs";
import SavedJobs from "./pages/applicants/savedJobs";
import WorkHistory from "./pages/applicants/WorkHistory";
import EditProfile from "./pages/personalInfoSettings";
import Messages from "./pages/applicants/messages";

// Offshore pages
import Offshore from "./pages/offshore";
import OffshoreNavbar from "./pages/offshore/OffshoreNavbar";
import OffshoreServices from "./pages/offshoreServices";
import OffshoreContact from "./pages/offshoreContact";

// Auth Pages
import ProfileCompletion from "./pages/auth/ProfileCompletion/ProfileCompletion";

// Settings pages
import SettingsLayout from "./layout/SettingsLayout";
import ProfileSettings from "./pages/settings/ProfileSettings";
import PreferencesSettings from "./pages/settings/PreferencesSettings";
import NotificationsSettings from "./pages/settings/NotificationsSettings";
import SecuritySettings from "./pages/settings/SecuritySettings";
import BillingSettings from "./pages/settings/BillingSettings";
import PaymentMethods from "./pages/settings/PaymentMethods";

function App() {
	return (
		<Routes>
			{/* ================= PUBLIC WEBSITE ================= */}
			<Route element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="profile-completion" element={<ProfileCompletion />} />
				<Route path="find-jobs" element={<FindJobs />} />
				<Route path="saved-jobs" element={<SavedJobs />} />
				<Route path="work-history/*" element={<WorkHistory />} />
				<Route path="jobs" element={<FindJobs />} />
				<Route path="messages/*" element={<Messages />} />
				<Route path="profile" element={<EditProfile />} />

				<Route path="settings" element={<SettingsLayout />}>
					<Route index element={<ProfileSettings />} />
					<Route path="notifications" element={<NotificationsSettings />} />
					<Route path="security" element={<SecuritySettings />} />
					<Route path="billing" element={<BillingSettings />} />
					<Route path="billing/payment-methods" element={<PaymentMethods />} />
					<Route path="preferences" element={<PreferencesSettings />} />
					<Route path="withdraw" element={<div>Withdraw Settings Page</div>} />
				</Route>
			</Route>

			{/* ================= APPLICANTS DASHBOARD ================= */}
			<Route path="applicants" element={<ApplicantsLayout />}>
				<Route index element={<FindJobs />} />
				<Route path="saved-jobs" element={<SavedJobs />} />
				<Route path="work-history/*" element={<WorkHistory />} />
				<Route path="messages/*" element={<Messages />} />
				<Route path="community/*" element={<>Community</>} />
			</Route>

			{/* ================= OFFSHORE PAGES ================= */}
			<Route
				path="offshore"
				element={
					<>
						<OffshoreNavbar />
						<Offshore />
					</>
				}
			/>

			<Route
				path="offshore/services"
				element={
					<>
						<OffshoreNavbar />
						<OffshoreServices />
					</>
				}
			/>

			<Route
				path="offshore/contact"
				element={
					<>
						<OffshoreNavbar />
						<OffshoreContact />
					</>
				}
			/>
		</Routes>
	);
}

export default App;
