import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ExpandMore } from "@mui/icons-material";

import { faqs } from "../../innerpages/data/faqs";

const FAQTabs = () => {
	const [activeTab, setActiveTab] = useState("General");
	const [openQuestion, setOpenQuestion] = useState(null);

	const tabs = ["General", "Freelancing", "Account", "Transfer"];

	const toggleQuestion = (index) => {
		setOpenQuestion(openQuestion === index ? null : index);
	};

	return (
		<div className="w-full max-w-6xl mx-auto px-4 py-8">
			{/* Tabs */}
			<div className="flex gap-4 mb-12 flex-wrap justify-center">
				{tabs.map((tab) => (
					<motion.button
						key={tab}
						onClick={() => {
							setActiveTab(tab);
							setOpenQuestion(null);
						}}
						className={`px-6 py-1.5 rounded-full text-sm cursor-pointer transition-all duration-300 ${
							activeTab === tab
								? "bg-primary text-white shadow-lg"
								: "bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium"
						}`}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						{tab}
					</motion.button>
				))}
			</div>

			{/* FAQ Content */}
			<AnimatePresence mode="wait">
				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.3 }}
					className="space-y-4"
				>
					{faqs[activeTab].map((faq, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="border-b border-gray-200"
						>
							<button
								onClick={() => toggleQuestion(index)}
								className="w-full flex justify-between items-center py-6 text-left hover:text-[#F05658] transition-colors group"
							>
								<span className="text-lg font-medium pr-4">{faq.question}</span>
								<motion.div
									animate={{ rotate: openQuestion === index ? 180 : 0 }}
									transition={{ duration: 0.3 }}
									className="shrink-0"
								>
									<ExpandMore className="text-gray-400 group-hover:text-[#F05658]" />
								</motion.div>
							</button>

							<AnimatePresence>
								{openQuestion === index && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3 }}
										className="overflow-hidden"
									>
										<p className="pb-6 text-gray-600 leading-relaxed">
											{faq.answer}
										</p>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default FAQTabs;
