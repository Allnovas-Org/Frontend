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
import ArticlesPage from "./pages/articles";
import HelpPage from "./pages/help";

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
import ClientsLayout from "./layout/ClientsLayout";
import SpotlightTalents from "./pages/clients/SpotlightTalents/SpotlightTalents";
import Notifications from "./pages/clients/Notifications/Notifications";
import SavedTalents from "./pages/clients/SpotlightTalents/SavedTalents";

// Community pages
import Dashboard from "./pages/community/Dashboard";
import CommunityHub from "./pages/community/CommunityHub";
import Followers from "./pages/community/Followers";
import Categories from "./pages/community/categories/Categories";
import CommunityPage from "./pages/community/CommunityPage";
import CommunityLayout from "./layout/Community";
import SavedPosts from "./pages/community/SavedPosts";
import CategoryDetail from "./pages/community/categories/CategoryDetail";
import PostDetail from "./pages/community/categories/PostDetail";

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
				<Route path="articles" element={<ArticlesPage />} />
				<Route path="help" element={<HelpPage />} />
				<Route path="community/*" element={<>Community</>} />
			</Route>
			{/* ================= CLIENTS DASHBOARD ================= */}
			<Route path="clients" element={<ClientsLayout />}>
				<Route index element={<SpotlightTalents />} />
				<Route path="notifications" element={<Notifications />} />
				<Route path="saved-talents" element={<SavedTalents />} />
			</Route>
			{/* COMMUNITY ROUTES */}
			<Route path="/community" element={<CommunityLayout />}>
				<Route index element={<CommunityPage />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="categories" element={<Categories />} />
				<Route path="categories/:slug" element={<CategoryDetail />} />
				<Route path="categories/:slug/post/:postId" element={<PostDetail />} />
				<Route path="saved-posts" element={<SavedPosts />} />
				<Route path="followers" element={<Followers />} />
				<Route path="hub" element={<CommunityHub />} />
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

			{/* Not Found Page */}
			<Route
				path="*"
				element={
					<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
						<h1 className="text-9xl font-extrabold text-gray-300">404</h1>
						<h2 className="text-3xl font-semibold text-gray-800 mt-4">
							Page Not Found
						</h2>
						<p className="text-gray-500 mt-2 text-center max-w-md">
							Sorry, the page you're looking for doesn't exist or has been
							moved.
						</p>
						<button
							onClick={() => window.history.back()}
							className="mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Go Back
						</button>
					</div>
				}
			/>
		</Routes>
	);
}

export default App;
