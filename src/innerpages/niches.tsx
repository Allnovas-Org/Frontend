import scribble from "../assets/images/misc-06.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React from "react";
import NichesSlider from "../components/ui/NichesSlider";

const SpecializedNiches = () => {
	return (
		<section
			id="nichesSection"
			className="shrink-0 min-h-fit pt-20 w-full flex flex-col items-center gap-8 px-4"
		>
			<div className="flex flex-col items-center gap-4">
				<p className="text-sm font-medium text-pinkish">Specialized Niches</p>
				<div className="shrink-0 relative text-center p-0 m-0 mx-6 max-lg:max-w-full">
					<h2 className="text-[2rem] font-semibold leading-tight">
						Your vision, Our niche
					</h2>
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 1.4, delay: 0.2 }}
						className="absolute -top-16 -right-8 w-18 h-18 max-md:-top-10 max-md:w-10 max-md:h-10 max-md:overflow-hidden"
						whileHover={{ scale: 1.1 }}
					>
						<img src={scribble} alt="scribble" className="w-full h-full" />
					</motion.div>
				</div>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 1.75, delay: 0.75 }}
					className="text-sm text-center font-light text-gray-500"
				>
					We connect clients with high-end freelancers across these categories
				</motion.p>
			</div>
			<NichesSlider />
		</section>
	);
};

export default SpecializedNiches;
