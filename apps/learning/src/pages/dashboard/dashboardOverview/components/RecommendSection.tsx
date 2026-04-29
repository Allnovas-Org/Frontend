import React from "react";
import { Layout } from "lucide-react";
import RecommendedCourseCard from "../components/RecommendedCourseCard";


const RecommendedSection = () => {
	return (
		<section className="py-8">
			<div className="flex items-center gap-2 mb-8">
				<h2 className="text-xl font-bold text-[#1A1C3D]">
					Recommended for you
				</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<RecommendedCourseCard
					image="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
					instructor={{ name: "Adebayo", role: "Senior Frontend Engineer" }}
					title="Full-stack Web Development"
					reviews="2,340"
					students="150k"
					progress={70}
					price={200}
				/>
				<RecommendedCourseCard
					image="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
					instructor={{ name: "Adebayo", role: "Senior Frontend Engineer" }}
					title="Full-stack Web Development"
					reviews="2,340"
					students="150k"
					progress={70}
					price={200}
				/>
				<RecommendedCourseCard
					image="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
					instructor={{ name: "Adebayo", role: "Senior Frontend Engineer" }}
					title="Full-stack Web Development"
					reviews="2,340"
					students="150k"
					progress={70}
					price={200}
				/>
			</div>
		</section>
	);
};

export default RecommendedSection;
