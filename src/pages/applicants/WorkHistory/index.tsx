import React from "react";
import { Routes, Route } from "react-router-dom";
import WorkHistorySideBar from "./WorkHistorySideBar";
import WorkHistoryList from "./WorkHistoryList";
import WorkHistoryDetails from "./WorkHistoryDetails";

const WorkHistory: React.FC = () => {
	return (
		<Routes>
			{/* Details page route */}
			<Route path=":id" element={<WorkHistoryDetails />} />

			{/* List page route (default) */}
			<Route
				path="/"
				element={
					<div className="flex min-h-screen bg-gray-50">
						<WorkHistorySideBar />
						<WorkHistoryList />
					</div>
				}
			/>
		</Routes>
	);
};

export default WorkHistory;
