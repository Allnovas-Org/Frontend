import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import scribble from "../assets/images/misc-06.png";

function HeroSection() {
	const testimonials = [
		{
			text: "We found an amazing talent for our project in no time",
			avatar:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
			rotate: 0,
		},
		{
			text: "The collaboration tools made our workflow seamless",
			avatar:
				"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces",
			rotate: -3,
		},
		{
			text: "Best freelancing platform we've ever used",
			avatar:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
			rotate: 2,
		},
		{
			text: "Quality work delivered right on time every single time",
			avatar:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
			rotate: -4,
		},
	];

	const testimonials2 = [
		{
			text: "Freelancing is the way to becoming self employed",
			avatar:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
			rotate: -5,
		},
		{
			text: "Build your career on your own terms with flexibility",
			avatar:
				"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces",
			rotate: -7,
		},
		{
			text: "Turn your passion into profit starting today",
			avatar:
				"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=faces",
			rotate: -3,
		},
		{
			text: "Freedom to work from anywhere in the world",
			avatar:
				"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=faces",
			rotate: -6,
		},
	];

	const [currentCard1, setCurrentCard1] = useState(0);
	const [currentCard2, setCurrentCard2] = useState(0);

	useEffect(() => {
		const interval1 = setInterval(() => {
			setCurrentCard1((prev) => (prev + 1) % testimonials.length);
		}, 5000);

		const interval2 = setInterval(() => {
			setCurrentCard2((prev) => (prev + 1) % testimonials2.length);
		}, 5500);

		return () => {
			clearInterval(interval1);
			clearInterval(interval2);
		};
	}, [testimonials.length, testimonials2.length]);

	// --- NEW CLEAN VERTICAL VARIANTS ---
	const verticalTransition = {
		y: { duration: 0.5, ease: "easeInOut" },
		opacity: { duration: 0.5, ease: "easeInOut" },
		scale: { duration: 0.5, ease: "easeInOut" },
		rotate: { duration: 0.5, ease: "easeInOut" },
	};

	const cardVariants = {
		enter: () => ({
			y: 40,
			opacity: 0,
			rotate: 5,
			scale: 0.9,
		}),
		center: {
			y: 0,
			opacity: 1,
			rotate: 0,
			scale: 1,
		},
		exit: () => ({
			y: -40,
			opacity: 0,
			rotate: -5,
			scale: 0.9,
		}),
	};

	const cardVariants2 = {
		enter: () => ({
			y: 40,
			opacity: 0,
			rotate: -5,
			scale: 0.9,
		}),
		center: {
			y: 0,
			opacity: 1,
			rotate: 0,
			scale: 1,
		},
		exit: () => ({
			y: -40,
			opacity: 0,
			rotate: 5,
			scale: 0.9,
		}),
	};

	return (
		<section
			id="home"
			className="shrink-0 min-h-fit w-full flex flex-col md:py-24 lg:justify-center items-center py-8"
		>
			<p className="text-sm font-medium text-pinkish">
				Designed for modern collaboration
			</p>

			<div className="inline-flex justify-center items-center w-full max-w-5xl">
				{/* Left card */}
				<div className="relative max-lg:hidden max-w-[250px] min-w-[250px] h-[150px]">
					<AnimatePresence initial={false}>
						<motion.div
							key={currentCard1}
							variants={cardVariants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={verticalTransition}
							className="absolute inset-x-0 inset-y-16"
						>
							<motion.div
								whileHover={{ rotate: 10, scale: 1.02 }}
								transition={{ duration: 0.3 }}
								className="bg-[#FFDDC1] p-4 shadow-2xl relative inline-flex items-center"
								style={{
									transform: `rotate(${testimonials[currentCard1].rotate}deg)`,
								}}
							>
								<p className="text-xs text-[#2C3E50] leading-tight">
									{testimonials[currentCard1].text}
								</p>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: 0.2 }}
								className="absolute -top-12 -left-4 w-12 h-12 rounded-full overflow-hidden shadow-xl"
								whileHover={{ scale: 1.1 }}
							>
								<img
									src={testimonials[currentCard1].avatar}
									alt="Person"
									className="w-full h-full object-cover"
								/>
							</motion.div>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Hero text */}
				<div className="text-center p-0 m-0 mx-6 flex flex-col">
					<span className="text-[2.5rem] font-bold leading-tight">
						Co-Creating Your Vision,
					</span>
					<span className="relative text-[2.5rem] text-[#F05658] font-bold leading-tight">
						One Step at a Time
						<motion.div
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.4, delay: 0.2 }}
							className="absolute -top-9 right-2 w-12 h-12 overflow-hidden lg:hidden"
							whileHover={{ scale: 1.1 }}
						>
							<img
								src={scribble}
								alt="Person"
								className="w-full h-full object-cover"
							/>
						</motion.div>
					</span>
				</div>

				{/* Right card */}
				<div className="relative max-lg:hidden max-w-[250px] min-w-[250px] h-[150px]">
					<AnimatePresence initial={false}>
						<motion.div
							key={currentCard2}
							variants={cardVariants2}
							initial="enter"
							animate="center"
							exit="exit"
							transition={verticalTransition}
							className="absolute inset-x-0 inset-y-8"
						>
							<motion.div
								whileHover={{ rotate: -10, scale: 1.02 }}
								transition={{ duration: 0.3 }}
								className="bg-[#FFDDC1] p-4 shadow-2xl relative inline-flex items-center"
								style={{
									transform: `rotate(${testimonials2[currentCard2].rotate}deg)`,
								}}
							>
								<p className="text-xs text-[#2C3E50] leading-tight">
									{testimonials2[currentCard2].text}
								</p>
								<span className="p-4"></span>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: 0.2 }}
								className="absolute -top-12 -right-4 w-12 h-12 rounded-full overflow-hidden shadow-xl"
								whileHover={{ scale: 1.1 }}
							>
								<img
									src={testimonials2[currentCard2].avatar}
									alt="Person"
									className="w-full h-full object-cover"
								/>
							</motion.div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>

			<p className="text-gray-600 text-center -mt-3 max-lg:mt-4 max-w-lg">
				From concept to final deliverables, we build with transparency at every
				stage, keeping you inspired throughout the journey
			</p>

			{/* Search Bar */}
			<div className="mt-12 w-full max-w-lg flex justify-center px-4">
				<div className="w-full flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
					<input
						type="text"
						placeholder="What are you looking for?"
						className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
					/>
					<button className="bg-[#F05658] hover:bg-[#f056589f] px-2 py-2 rounded-full hover:opacity-90 transition-opacity cursor-pointer">
						<svg
							className="w-5 h-5 text-white hover:animate-bounce"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
				</div>
			</div>

			{/* Popular search terms */}
			<div className="flex flex-wrap justify-center items-center gap-4 py-6 max-w-5xl px-4">
				<span className="text-gray-600 text-sm">Popular Search:</span>

				{[
					"Graphic Design",
					"Web Development",
					"Programming",
					"UI/UX Design",
					"Presentation Design",
					"Video Editing",
				].map((term, index) => (
					<motion.button
						key={index}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs text-gray-800 font-medium rounded-full transition-colors duration-200"
					>
						{term}
					</motion.button>
				))}
			</div>
		</section>
	);
}

export default HeroSection;
