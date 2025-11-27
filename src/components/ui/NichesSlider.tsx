import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import { niches } from "../../innerpages/data/niches";

function NichesSlider() {
	const scrollContainerRef = useRef(null);
	const [isAtStart, setIsAtStart] = useState(true);
	const [isAtEnd, setIsAtEnd] = useState(false);

	const NicheCard = ({ title, image }) => (
		<div className="border-[0.5px] border-gray-200 shadow shrink-0 w-64 bg-white rounded-2xl overflow-hidden transition-transform hover:scale-105">
			<div className="h-[200px] overflow-hidden p-1">
				<img
					src={image}
					alt={title}
					className="w-full rounded-t-2xl h-full object-cover"
				/>
			</div>
			<div className="py-4 border-t border-gray-200 text-center">
				<h3 className="lg:text-lg font-bold text-gray-800">{title}</h3>
			</div>
		</div>
	);

	// Check scroll position and update button states
	const checkScrollPosition = () => {
		if (!scrollContainerRef.current) return;

		const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

		// At start if scrolled to the left edge (with small threshold)
		setIsAtStart(scrollLeft <= 1);

		// At end if scrolled to the right edge (with small threshold for rounding errors)
		setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
	};

	// Smooth scroll by one card width
	const scrollByAmount = (direction) => {
		if (!scrollContainerRef.current) return;

		const cardWidth = 256; // w-64
		const gap = window.innerWidth < 640 ? 16 : 24;
		const scrollAmount = (cardWidth + gap) * direction;

		scrollContainerRef.current.scrollBy({
			left: scrollAmount,
			behavior: "smooth",
		});
	};

	const nextSlide = () => scrollByAmount(1);
	const prevSlide = () => scrollByAmount(-1);

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;
		if (!scrollContainer) return;

		// Check initial position
		checkScrollPosition();

		// Add scroll listener
		scrollContainer.addEventListener("scroll", checkScrollPosition);

		// Check on resize as well
		window.addEventListener("resize", checkScrollPosition);

		return () => {
			scrollContainer.removeEventListener("scroll", checkScrollPosition);
			window.removeEventListener("resize", checkScrollPosition);
		};
	}, []);

	return (
		<div className="w-full flex items-center justify-center p-1 sm:p-8">
			<div className="relative min-w-[300px] w-full max-w-[1328px]">
				<button
					onClick={prevSlide}
					disabled={isAtStart}
					className={`absolute left-0 sm:left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 bg-white rounded-full p-2 sm:p-3 border-[0.5px] border-gray-400 transition-colors ${
						isAtStart
							? "opacity-50 cursor-not-allowed"
							: "hover:bg-gray-100 cursor-pointer"
					}`}
				>
					<ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
				</button>

				<div
					ref={scrollContainerRef}
					className="overflow-x-auto overflow-y-hidden mx-4 py-2 scrollbar-hide scroll-smooth"
					style={{
						scrollbarWidth: "none",
						msOverflowStyle: "none",
					}}
				>
					<div className="flex gap-4 sm:gap-6">
						{niches.map((service, index) => (
							<NicheCard
								key={index}
								title={service.title}
								image={service.image}
							/>
						))}
					</div>
				</div>

				<button
					onClick={nextSlide}
					disabled={isAtEnd}
					className={`absolute right-0 sm:right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 bg-white rounded-full p-2 sm:p-3 border-[0.5px] border-gray-400 transition-colors ${
						isAtEnd
							? "opacity-50 cursor-not-allowed"
							: "hover:bg-gray-100 cursor-pointer"
					}`}
				>
					<ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
				</button>
			</div>

			{/* Hide scrollbar with CSS */}
			<style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
		</div>
	);
}
export default NichesSlider;
