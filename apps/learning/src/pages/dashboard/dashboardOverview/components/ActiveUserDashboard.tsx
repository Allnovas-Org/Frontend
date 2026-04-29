import React, { useState } from 'react'
import Stat from './Stat';
import CurrentProjectCard from './CurrentProjectCard';
import WelcomeHeader from './WelcomeHeader';
import { Layout } from 'lucide-react';
import RecommendedSection from './RecommendSection';
import { Flame, BookOpen, MoreHorizontal } from 'lucide-react';


const MilestoneCard = ({
  icon: Icon,
  label,
  title,
  bgColor,
  iconColor,
}: any) => (
  <div
    className={`p-6 rounded-xl border flex flex-col items-center gap-3 ${bgColor} border-current/10`}
  >
    <Icon className={iconColor} size={24} />
    <span className="text-gray-600 text-xs font-medium text-center">
      {title}
    </span>
  </div>
);


const ActiveUserDashboard = () => {
  

  
  return (
		<div>
			<WelcomeHeader />

			<section>
				<div className="flex items-center gap-2 mb-4">
					<Layout size={20} />
					<h2 className="font-bold">Badges & Milestone</h2>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<MilestoneCard
						title="7 Days Streak"
						icon={Flame}
						bgColor="bg-yellow-50"
						iconColor="text-orange-500"
					/>
					<MilestoneCard
						title="10 lesson completed"
						icon={BookOpen}
						bgColor="bg-purple-50"
						iconColor="text-purple-600"
					/>
					<MilestoneCard
						title="Completed first module"
						icon={Layout}
						bgColor="bg-orange-50"
						iconColor="text-yellow-500"
					/>
					<MilestoneCard
						title="Design four screens"
						icon={MoreHorizontal}
						bgColor="bg-blue-50"
						iconColor="text-blue-600"
					/>
				</div>
			</section>

			<section>
				<RecommendedSection />
			</section>

			<section className="my-12">
				<h2 className="text-xl font-black text-[#3D4071] mb-6 tracking-tight">
					CURRENT PROJECTS
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<CurrentProjectCard
						title="App Development"
						company="Creative Hub"
						color="bg-[#635BFF]"
					/>
					<CurrentProjectCard
						title="Software Testing"
						company="D3 Testing"
						color="bg-[#78C56F]"
					/>
					<CurrentProjectCard
						title="Quality Assurance"
						company="Q2 Technologies"
						color="bg-[#5AFF3D]"
					/>
					<CurrentProjectCard
						title="Quality Assurance"
						company="Q2 Technologies"
						color="bg-[#FF9C65]"
					/>
				</div>
			</section>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				<Stat />
			</div>
		</div>
	);
}

export default ActiveUserDashboard