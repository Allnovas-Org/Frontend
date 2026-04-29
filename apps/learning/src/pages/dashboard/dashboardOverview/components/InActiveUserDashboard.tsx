import React from 'react'
import RecommendationCard from "./Recommended";
import EmptyState from '../../../../components/EmptyState';
import CourseCard from './CourseCard';

const InActiveUserDashboard = ({
	onStartAssessment,
}: {
	onStartAssessment: () => void;
}) => {
	return (
		<div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
				<div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
					<h1 className="text-xl font-semibold mb-2">
						Welcome back, Shemilore
					</h1>
					<p className="text-gray-500 text-sm">
						Start your tech journey by choosing a learning path tailored for you
					</p>

					<div className="mt-4">
						<div className="flex justify-between text-sm text-gray-500 mb-1">
							<span>Overall progress</span>
							<span>0%</span>
						</div>
						<div className="w-full h-2 bg-gray-200 rounded-full">
							<div className="h-2 bg-purple-600 rounded-full w-0" />
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-sm">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-sm font-semibold text-gray-700">
							Daily Streak
						</h2>
						<span className="text-sm text-gray-500">0 🔥</span>
					</div>

					<div className="flex justify-between gap-2">
						{Array.from({ length: 7 }).map((_, index) => (
							<div
								key={index}
								className="w-8 h-8 rounded-full border border-gray-300"
							/>
						))}
					</div>
				</div>
			</div>

			<EmptyState />

			<div className="mt-8">
				<h2 className="text-sm font-semibold text-gray-700 mb-4">
					Suggested learning path
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{Array.from({ length: 3 }).map((_, i) => (
						<CourseCard key={i} />
					))}
				</div>
			</div>

			<div className="min-h-screen bg-gray-50 py-12">
				<RecommendationCard
					category="Top Pick for Beginners"
					title="AI & Digital Skills Path"
					description="The shortest path to becoming relevant in the modern job market. No coding required—just a willingness to learn the smartest way."
					tags={[
						"Ai tools",
						"Prompt engineering",
						"Automation",
						"Digital productivity",
					]}
					onStart={onStartAssessment}
				/>
			</div>
		</div>
	);
};

export default InActiveUserDashboard