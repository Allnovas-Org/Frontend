import React, {useState} from "react";
import ActionButton  from "../../../../components/ui/ActionButton";

// --- Types ---
interface SkillPathProps {
	category: string;
	title: string;
	description: string;
	tags: string[];
	onStart: () => void;
}

// --- Sub-Components ---
const Tag = ({ text }: { text: string }) => (
	<span className="px-3 py-2 text-xs font-medium text-gray-300 rounded-lg bg-white/10 border border-white/5">
		{text}
	</span>
);



const RecommendationCard: React.FC<SkillPathProps> = ({
	category,
	title,
	description,
	tags,
	onStart,
}) => {
	
	return (
		<div className="max-w-5xl mx-auto p-6 font-sans">
			{/* Header Section */}
			<div className="mb-6">
				<p className="text-gray-500 text-sm mb-1">
					Based on beginner learners like you
					<span className="text-black font-bold ml-2">
						Recommended For You
					</span>
				</p>
			</div>

			{/* Main Card */}
			<div className="relative overflow-hidden rounded-[32px] bg-[#0B010E] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
				<div className="flex-1 space-y-6">
					<span className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 rounded-lg text-gray-200">
						{category}
					</span>

					<div className="space-y-3">
						<h2 className="text-2xl md:text-3xl font-bold tracking-tight">
							{title}
						</h2>
						<p className="text-gray-400 text-lg leading-relaxed max-w-xl">
							{description}
						</p>
					</div>

					<div className="flex flex-wrap gap-2 pt-2">
						{tags.map((tag) => (
							<Tag key={tag} text={tag} />
						))}
					</div>
				</div>

				<div className="shrink-0">
					<ActionButton>Start This Path</ActionButton>
				</div>
			</div>

			{/* Footer Section */}
			<div className="mt-12 text-center space-y-6">
				<div className="space-y-2">
					<h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">
						Not sure where to start?
					</h3>
					<p className="text-gray-500">
						Answer 5 quick questions and we'll match you with the perfect path
					</p>
				</div>

				<ActionButton
					onClick={() => {
          console.log("Button internal click triggered");
          onStart();
        }} 
				variant="secondary"
				>
					Take skill assessment
				</ActionButton>
			</div>
		</div>
	);
};

export default RecommendationCard;