import React, { useState } from "react";
import {
	Select,
	MenuItem,
	FormControl,
	SelectChangeEvent,
	Switch,
} from "@mui/material";

interface PreferencesData {
	theme: string;
	language: string;
	timezone: string;
	showOnlineStatus: boolean;
	allowProfileSearch: boolean;
}

const PreferencesSettings: React.FC = () => {
	const [preferences, setPreferences] = useState<PreferencesData>({
		theme: "Light",
		language: "English",
		timezone: "Pacific Time (PST)",
		showOnlineStatus: true,
		allowProfileSearch: true,
	});

	const [hasChanges, setHasChanges] = useState(false);

	const handleSelectChange = (e: SelectChangeEvent<string>) => {
		const { name, value } = e.target;
		setPreferences((prev) => ({
			...prev,
			[name as string]: value,
		}));
		setHasChanges(true);
	};

	const handleSwitchChange =
		(name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setPreferences((prev) => ({
				...prev,
				[name]: event.target.checked,
			}));
			setHasChanges(true);
		};

	const handleSave = () => {
		// Handle save logic here
		console.log("Saved preferences:", preferences);
		setHasChanges(false);
	};

	const handleReset = () => {
		setPreferences({
			theme: "Light",
			language: "English",
			timezone: "Pacific Time (PST)",
			showOnlineStatus: true,
			allowProfileSearch: true,
		});
		setHasChanges(false);
	};

	return (
		<div className="w-full">
			{/* Header */}
			<div className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-900 mb-1">
					Preferences
				</h2>
				<p className="text-sm text-gray-500">Personalize your experience</p>
			</div>

			{/* Display Section */}
			<div className="mb-8">
				<h3 className="text-base font-semibold text-gray-900 mb-4">Display</h3>
				<div className="space-y-4">
					{/* Theme */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Theme
						</label>
						<FormControl fullWidth size="small">
							<Select
								name="theme"
								value={preferences.theme}
								onChange={handleSelectChange}
								sx={{
									borderRadius: "8px",
									backgroundColor: "white",
								}}
							>
								<MenuItem value="Light">Light</MenuItem>
								<MenuItem value="Dark">Dark</MenuItem>
								<MenuItem value="System">System</MenuItem>
							</Select>
						</FormControl>
					</div>

					{/* Language */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Language
						</label>
						<FormControl fullWidth size="small">
							<Select
								name="language"
								value={preferences.language}
								onChange={handleSelectChange}
								sx={{
									borderRadius: "8px",
									backgroundColor: "white",
								}}
							>
								<MenuItem value="English">English</MenuItem>
								<MenuItem value="Spanish">Spanish</MenuItem>
								<MenuItem value="French">French</MenuItem>
								<MenuItem value="German">German</MenuItem>
								<MenuItem value="Chinese">Chinese</MenuItem>
							</Select>
						</FormControl>
					</div>

					{/* Timezone */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Timezone
						</label>
						<FormControl fullWidth size="small">
							<Select
								name="timezone"
								value={preferences.timezone}
								onChange={handleSelectChange}
								sx={{
									borderRadius: "8px",
									backgroundColor: "white",
								}}
							>
								<MenuItem value="Pacific Time (PST)">
									Pacific Time (PST)
								</MenuItem>
								<MenuItem value="Mountain Time (MST)">
									Mountain Time (MST)
								</MenuItem>
								<MenuItem value="Central Time (CST)">
									Central Time (CST)
								</MenuItem>
								<MenuItem value="Eastern Time (EST)">
									Eastern Time (EST)
								</MenuItem>
								<MenuItem value="UTC">UTC</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>
			</div>

			{/* Privacy Section */}
			<div className="mb-8">
				<h3 className="text-base font-semibold text-gray-900 mb-4">Privacy</h3>
				<div className="space-y-4">
					{/* Show Online Status */}
					<div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
						<div>
							<h4 className="text-sm font-semibold text-gray-900 mb-1">
								Show Online Status
							</h4>
							<p className="text-sm text-gray-500">
								Let others see when you're online
							</p>
						</div>
						<Switch
							checked={preferences.showOnlineStatus}
							onChange={handleSwitchChange("showOnlineStatus")}
							sx={{
								"& .MuiSwitch-switchBase.Mui-checked": {
									color: "#2196F3",
								},
								"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
									backgroundColor: "#2196F3",
								},
							}}
						/>
					</div>

					{/* Allow Profile Search */}
					<div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
						<div>
							<h4 className="text-sm font-semibold text-gray-900 mb-1">
								Allow Profile Search
							</h4>
							<p className="text-sm text-gray-500">
								Let your profile appear in search results
							</p>
						</div>
						<Switch
							checked={preferences.allowProfileSearch}
							onChange={handleSwitchChange("allowProfileSearch")}
							sx={{
								"& .MuiSwitch-switchBase.Mui-checked": {
									color: "#2196F3",
								},
								"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
									backgroundColor: "#2196F3",
								},
							}}
						/>
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="flex justify-between items-center pt-6 border-t border-gray-200">
				<button
					onClick={handleReset}
					className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition"
				>
					Reset to default
				</button>
				<button
					onClick={handleSave}
					disabled={!hasChanges}
					className="px-6 py-2 text-sm text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
					style={{ backgroundColor: "#F05658" }}
					onMouseEnter={(e) => {
						if (hasChanges) {
							e.currentTarget.style.backgroundColor = "#d94446";
						}
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = "#F05658";
					}}
				>
					Save Changes
				</button>
			</div>
		</div>
	);
};

export default PreferencesSettings;
