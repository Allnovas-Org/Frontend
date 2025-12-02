// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React from "react";
import { East } from "@mui/icons-material";

const CustomButton = ({
	buttonText,
	otherStyles = "",
	reverseAnimate = false,
	customStyles = false,
}) => {
	return (
		<motion.button
			whileHover="hover"
			whileTap="hover"
			className={`cursor-pointer ${
				customStyles
					? otherStyles
					: `relative overflow-hidden px-6 py-3 ${otherStyles}`
			}`}
		>
			<span className="relative z-10 flex items-center gap-2">
				{reverseAnimate ? (
					<>
						{/* Reverse Animation: Arrow starts on left, visible by default */}
						<motion.span
							variants={{
								hover: {
									opacity: 0,
									x: -10,
								},
							}}
							initial={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3 }}
						>
							<East fontSize="small" />
						</motion.span>

						{/* Button Text - moves left on hover */}
						<motion.span
							variants={{
								hover: {
									x: -8,
								},
							}}
							initial={{ x: 0 }}
							transition={{ duration: 0.3 }}
						>
							{buttonText}
						</motion.span>

						{/* Arrow - comes from left, appears on hover */}
						<motion.span
							variants={{
								hover: {
									x: 0,
									opacity: 1,
								},
							}}
							initial={{ x: -10, opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="absolute -right-4"
						>
							<East fontSize="small" />
						</motion.span>
					</>
				) : (
					<>
						{/* Original Animation: Arrow moves from right to left */}
						<motion.span
							variants={{
								hover: {
									x: -10,
									opacity: 1,
								},
							}}
							initial={{ x: 0, opacity: 0 }}
							transition={{ duration: 1 }}
							className="absolute -left-1"
						>
							<East fontSize="small" />
						</motion.span>

						{/* Button Text */}
						<motion.span
							variants={{
								hover: {
									x: 8,
								},
							}}
							initial={{ x: 0 }}
							transition={{ duration: 0.3 }}
						>
							{buttonText}
						</motion.span>

						{/* Arrow - visible by default, fades on hover */}
						<motion.span
							variants={{
								hover: {
									opacity: 0,
									x: 10,
								},
							}}
							initial={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.1 }}
						>
							<East fontSize="small" />
						</motion.span>
					</>
				)}
			</span>
		</motion.button>
	);
};

export default CustomButton;
