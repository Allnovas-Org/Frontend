import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Memory, Settings, VerifiedUser } from "@mui/icons-material";
import CustomButton from "../components/ui/CustomButton";

const Function = () => {
	const [activeCard, setActiveCard] = useState(1); // Default to middle card (Functionality)

	const cards = [
		{
			id: 0,
			title: "Accessibility",
			description:
				"Work from anywhere, build your career. Your style, your terms.",
			icon: Memory,
			inactiveGradient:
				"linear-gradient(43.5deg, #011E40 42.65%, #014088 59.45%)",
			activeGradient: "linear-gradient(180deg, #0066CC 0%, #011E40 100%)", // Vertical: light to dark
		},
		{
			id: 1,
			title: "Functionality",
			description:
				"Connect, create and earn with tools that make freelancing seamless.",
			icon: Settings,
			inactiveGradient:
				"linear-gradient(0.85deg, #460050 29.2%, #630071 46.57%)",
			activeGradient: "linear-gradient(180deg, #630071 50%, #460050 100%)", // Vertical: light to dark
		},
		{
			id: 2,
			title: "Security",
			description:
				"Transparent systems and reduced service fees that protect your hustle.",
			icon: VerifiedUser,
			inactiveGradient:
				"linear-gradient(314.23deg, #026813 37.39%, #003B0A 53.62%)",
			activeGradient: "linear-gradient(180deg, #00B81F 0%, #003B0A 100%)", // Vertical: light to dark
		},
	];

	return (
		<section
			id="missionSection"
			className="shrink-0 max-md:min-h-screen w-full flex flex-col justify-center items-center gap-8 px-4"
		>
			<div className="min-h-fit flex flex-col justify-center items-center gap-4">
				<p className="text-sm font-medium text-pinkish">Our Mission</p>
				<div className="text-center p-0 m-0 mx-6 max-lg:w-full max-w-136">
					<h2 className="text-3xl font-semibold leading-tight">
						Building A Trusted Ecosystem Where Talents Thrive And Opportunities
						Grow
					</h2>
				</div>
				<p className="text-gray-600 text-center max-w-lg">
					Secured payments, verified talents and transparent projects
				</p>
			</div>
			<div className="flex gap-4 max-w-5xl mx-auto w-full max-lg:hidden">
				{cards.map((card) => {
					const Icon = card.icon;
					const isActive = activeCard === card.id;

					return (
						<motion.div
							key={card.id}
							onMouseEnter={() => setActiveCard(card.id)}
							onMouseLeave={() => setActiveCard(1)}
							animate={{
								flex: isActive ? 2 : 1,
								background: isActive
									? card.activeGradient
									: card.inactiveGradient,
							}}
							transition={{
								duration: 1.5,
								ease: [0.34, 1.56, 0.64, 1],
							}}
							className="rounded-tr-3xl rounded-bl-3xl overflow-hidden cursor-pointer max-lg:flex-1"
							style={{
								height: "400px",
							}}
						>
							<div
								className={
									"p-8 h-full flex flex-col items-center text-white max-lg:justify-between max-lg:pb-12" +
									(isActive
										? ""
										: " justify-between pb-12 lg:justify-between lg:pb-12")
								}
							>
								<motion.div
									animate={{
										scale: isActive ? 1.1 : 1,
										opacity: isActive ? 1 : 0.8,
									}}
									transition={{ duration: 0.3 }}
									className="max-lg:scale-110 max-lg:opacity-100 mb-3"
								>
									<Icon style={{ fontSize: 48, opacity: 0.9 }} />
								</motion.div>

								{/* Content */}
								<div className={"text-center " + (isActive ? "lg:h-7/12" : "")}>
									<motion.h2
										className="text-3xl font-bold mb-3 font-mali"
										animate={{
											y: isActive ? 0 : 20,
										}}
										transition={{ duration: 0.4 }}
									>
										{card.title}
									</motion.h2>

									{/* Desktop: AnimatePresence for conditional rendering */}
									<div className="h-full">
										<AnimatePresence mode="wait">
											{isActive && (
												<motion.div
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: 20 }}
													transition={{ duration: 0.3, delay: 0.1 }}
													className="h-full flex flex-col justify-between"
												>
													<p className="max-w-[350px] font-light text-base mb-8 text-white/90">
														{card.description}
													</p>
													<CustomButton
														buttonText="Get Started"
														otherStyles="bg-black/10 rounded-full mx-auto"
													/>
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>
			{/* Mobile screens */}
			<div className="w-full flex flex-col items-center gap-4 lg:hidden">
				{cards.map((card, index) => {
					const Icon = card.icon;

					return (
						<motion.div
							key={card.id}
							className="max-w-[80%] rounded-tr-3xl rounded-bl-3xl overflow-hidden cursor-pointer w-full"
							style={{
								background: card.activeGradient, // Always use active gradient on mobile
								height: "300px",
							}}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{
								duration: 0.5,
								delay: index * 0.1,
								ease: "easeOut",
							}}
							whileTap={{ scale: 1.02 }}
						>
							<div className="p-8 h-full flex flex-col items-center justify-between text-white">
								<motion.div
									initial={{ scale: 0 }}
									whileInView={{ scale: 1 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.5,
										delay: index * 0.1 + 0.2,
										type: "spring",
										stiffness: 200,
									}}
								>
									<Icon style={{ fontSize: 48, opacity: 0.9 }} />
								</motion.div>

								{/* Content */}
								<motion.div
									className="text-center flex flex-col gap-4"
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.5,
										delay: index * 0.1 + 0.3,
									}}
								>
									<h2 className="text-2xl font-bold font-mali">{card.title}</h2>
									<p className="text-base text-white/90">{card.description}</p>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.5,
										delay: index * 0.1 + 0.4,
									}}
								>
									<CustomButton
										buttonText="Get Started"
										otherStyles="bg-black/10 rounded-full"
									/>
								</motion.div>
							</div>
						</motion.div>
					);
				})}
			</div>
		</section>
	);
};

export default Function;
