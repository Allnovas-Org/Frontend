import React, { useState } from "react";
import ChangePasswordModal from "./components/modals/change-password/ChangePasswordModal";
import DeviceSignOutModal from "./components/modals/device-sign-out/DeviceSignOutModal";
import CloseAccountFlow from "./components/modals/close-account/CloseAccountFlow";
import TwoFAFlow from "./components/modals/enable-2fa/TwoFAFlow";

interface ActiveSession {
	id: string;
	device: string;
	location: string;
	lastActive: string;
}

const SecuritySettings: React.FC = () => {
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
	const [isCloseAccountOpen, setIsCloseAccountOpen] = useState(false);
	const [is2FAFlowOpen, setIs2FAFlowOpen] = useState(false);
	const [selectedSession, setSelectedSession] = useState<ActiveSession | null>(
		null,
	);

	const [activeSessions] = useState<ActiveSession[]>([
		{
			id: "1",
			device: "Chrome on macOS",
			location: "San Francisco, CA",
			lastActive: "Now",
		},
		{
			id: "2",
			device: "Safari on iPhone",
			location: "San Francisco, CA",
			lastActive: "2 hours ago",
		},
		{
			id: "3",
			device: "Chrome on Windows",
			location: "New York, NY",
			lastActive: "1 day ago",
		},
	]);

	const handleSignOut = (sessionId: string) => {
		const session = activeSessions.find((s) => s.id === sessionId);
		if (session) {
			setSelectedSession(session);
			setIsSignOutModalOpen(true);
		}
	};

	const handleConfirmSignOut = () => {
		if (selectedSession) {
			console.log("Signing out session:", selectedSession.id);
			// Handle sign out logic here
			setSelectedSession(null);
		}
	};

	const handleChangePassword = () => {
		setIsPasswordModalOpen(true);
	};

	const handleEnable2FA = () => {
		setIs2FAFlowOpen(true);
	};

	const handle2FAEnabled = () => {
		console.log("2FA enabled successfully");
		// Here you would typically:
		// 1. Update user's 2FA status in state/context
		// 2. Show success notification
		// 3. Refresh security settings to show 2FA is enabled
	};

	const handleCloseAccount = () => {
		setIsCloseAccountOpen(true);
	};

	const handleAccountClosed = () => {
		console.log("Account closed successfully");
		// Here you would typically:
		// 1. Show a success message
		// 2. Clear user session
		// 3. Redirect to homepage or login
	};

	return (
		<div className="w-full">
			{/* Header */}
			<div className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-900 mb-1">Security</h2>
				<p className="text-sm text-gray-500">Protect your account</p>
			</div>

			{/* Password Section */}
			<div className="mb-8">
				<h3 className="text-base font-semibold text-gray-900 mb-4">Password</h3>
				<div className="flex max-md:gap-4 max-md:flex-col items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
					<div>
						<h4 className="text-sm font-semibold text-gray-900 mb-1">
							Change your password
						</h4>
						<p className="text-sm text-gray-500">Last changed 3 months ago</p>
					</div>
					<button
						onClick={handleChangePassword}
						className="md:px-4 max-md:w-full py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
					>
						Change Password
					</button>
				</div>
			</div>

			{/* Two-Factor Authentication Section */}
			<div className="mb-8">
				<h3 className="text-base font-semibold text-gray-900 mb-4">
					Two-Factor Authentication
				</h3>
				<div className="flex max-md:gap-4 max-md:flex-col items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
					<div>
						<h4 className="text-sm font-semibold text-gray-900 mb-1">
							Enable 2FA for extra security
						</h4>
						<p className="text-sm text-gray-500">
							Add an extra layer of protection to your account with two-factor
							authentication
						</p>
					</div>
					<button
						onClick={handleEnable2FA}
						className="md:px-4 max-md:w-full py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition whitespace-nowrap md:ml-4"
					>
						Enable 2FA
					</button>
				</div>
			</div>

			{/* Active Sessions Section */}
			<div className="mb-8">
				<h3 className="text-base font-semibold text-gray-900 mb-4">
					Active Sessions
				</h3>
				<div className="space-y-3">
					{activeSessions.map((session) => (
						<div
							key={session.id}
							className="flex max-md:gap-4 max-md:flex-col items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
						>
							<div>
								<h4 className="text-sm font-semibold text-gray-900 mb-1">
									{session.device}
								</h4>
								<p className="text-sm text-gray-500">
									{session.location} · Last active {session.lastActive}
								</p>
							</div>
							<button
								onClick={() => handleSignOut(session.id)}
								className="md:px-4 max-md:w-full py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
							>
								Sign Out
							</button>
						</div>
					))}
				</div>
			</div>

			{/* Permanently Delete Account Section */}
			<div className="p-4 bg-white border border-gray-200 rounded-lg">
				<h3 className="text-base font-semibold text-gray-900 mb-2">
					Permanently Delete Account
				</h3>
				<button
					onClick={handleCloseAccount}
					className="text-sm hover:underline"
					style={{ color: "#F05658" }}
				>
					Close my account
				</button>
			</div>

			{/* Change Password Modal */}
			<ChangePasswordModal
				open={isPasswordModalOpen}
				onClose={() => setIsPasswordModalOpen(false)}
				userEmail="alex.johnson@example.com"
			/>

			{/* Device Sign Out Modal */}
			{selectedSession && (
				<DeviceSignOutModal
					open={isSignOutModalOpen}
					onClose={() => {
						setIsSignOutModalOpen(false);
						setSelectedSession(null);
					}}
					deviceName={selectedSession.device}
					location={selectedSession.location}
					onConfirm={handleConfirmSignOut}
				/>
			)}

			{/* Close Account Flow */}
			<CloseAccountFlow
				open={isCloseAccountOpen}
				onClose={() => setIsCloseAccountOpen(false)}
				onAccountClosed={handleAccountClosed}
			/>

			{/* Two-Factor Authentication Flow */}
			<TwoFAFlow
				open={is2FAFlowOpen}
				onClose={() => setIs2FAFlowOpen(false)}
				on2FAEnabled={handle2FAEnabled}
			/>
		</div>
	);
};

export default SecuritySettings;
