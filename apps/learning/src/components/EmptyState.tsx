import React from "react";
import EmptyImg from "../../src/assets/empty.png"; 
const EmptyState = () => {
	return (
		<div className="flex flex-col items-center justify-center text-center py-10">
			<img
				src={EmptyImg}
				className="w-96 mb-6"
				alt="Empty state illustration"
			/>
			<button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition">
				Explore Learning Path →
			</button>
		</div>
	);
};

export default EmptyState;
