import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import FAQTabs from "../components/ui/FAQTabs";

export default function ArticlesFAQ() {
	const [activeTab, setActiveTab] = useState("General");
	const [openFAQ, setOpenFAQ] = useState<number | null>(null);

	const articles = [
		{
			id: 1,
			image: "/images/blog-1.png",
			title: "How to Keep Your Clients, and earn their trust",
			category: "Business",
		},
		{
			id: 2,
			image: "/images/blog-2.png",
			title: "Getting Started on Allnova: Basics of Allnova",
			category: "Guide",
		},
		{
			id: 3,
			image: "/images/blog-3.png",
			title: "Creating A Winning Gig Image: Convert Clients Easily",
			category: "Marketing",
		},
	];

	const tabs = ["General", "Freelancing", "Account", "Transfer"];

	const faqData = {
		General: [
			{
				question: "What is Allnovas about?",
				answer:
					"Allnova is a platform connecting freelancers with clients worldwide.",
			},
			{
				question: "Who can use Allnovas?",
				answer:
					"Anyone looking to hire freelancers or offer their services can use Allnova.",
			},
			{
				question: "How does Allnovas ensure quality?",
				answer:
					"We have a rigorous vetting process and rating system for all freelancers.",
			},
			{
				question: "Is Allnovas available worldwide?",
				answer: "Yes, Allnova is accessible globally in over 150 countries.",
			},
		],
		Freelancing: [
			{
				question: "How do I start freelancing on Allnovas?",
				answer:
					"Create an account, complete your profile, and start creating gigs to offer your services.",
			},
			{
				question: "What services can I offer?",
				answer:
					"You can offer any professional service including design, writing, programming, marketing, and more.",
			},
			{
				question: "How do I set my rates?",
				answer:
					"You have full control over your pricing. Research market rates and set competitive prices.",
			},
			{
				question: "When do I get paid?",
				answer:
					"Payment is released after successful project completion and client approval.",
			},
		],
		Account: [
			{
				question: "How do I create an account?",
				answer:
					"Click on Sign Up, enter your email, create a password, and verify your email address.",
			},
			{
				question: "Can I change my username?",
				answer:
					"Yes, you can change your username once every 60 days in your account settings.",
			},
			{
				question: "How do I verify my account?",
				answer:
					"Complete your profile, upload required documents, and wait for our team to review.",
			},
			{
				question: "Is my data secure?",
				answer:
					"Yes, we use industry-standard encryption and security measures to protect your data.",
			},
		],
		Transfer: [
			{
				question: "How do I withdraw my earnings?",
				answer:
					"Go to your earnings section and request a withdrawal to your preferred payment method.",
			},
			{
				question: "What payment methods are available?",
				answer:
					"We support PayPal, bank transfer, and various local payment options.",
			},
			{
				question: "Are there any withdrawal fees?",
				answer:
					"Small service fees apply depending on your chosen payment method and amount.",
			},
			{
				question: "How long does a transfer take?",
				answer:
					"Transfers typically process within 3-7 business days depending on the payment method.",
			},
		],
	};

	const currentFAQs = faqData[activeTab as keyof typeof faqData];

	return (
		<div className="max-w-6xl mx-auto bg-white">
			{/* Articles Section */}
			<div className="max-w-6xl mx-auto px-5 py-16">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
					<div>
						<span className="text-purple-600 text-sm font-semibold tracking-wide mb-2 block">
							Insights
						</span>
						<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
							Latest Articles
						</h2>
						<p className="text-gray-600 text-sm md:text-base">
							Check out the latest updates and free resources from Allnova.
						</p>
					</div>
					<button className="group text-[#F05658] font-semibold cursor-pointer flex items-center gap-2 hover:gap-3 transition-all duration-300">
						View All Posts
						<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
					{articles.map((article) => (
						<div key={article.id} className="text-center">
							<div className="mb-4 overflow-hidden rounded-xl">
								<img
									src={article.image}
									alt={article.title}
									className="w-full h-64 object-cover"
								/>
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-4 px-2">
								{article.title}
							</h3>
							<button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2 cursor-pointer">
								<span>View Post</span>
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
									<path
										d="M6 3L11 8L6 13"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
					))}
				</div>
			</div>

			{/* FAQ Section */}
			<div className="bg-white py-16 px-5">
				<div className="max-w-4xl mx-auto">
					<motion.div
						className="flex flex-col items-center justify-center mx-auto -gap-4 max-lg:hidden max-w-[648px]"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6 }}
					>
						<svg
							width="543"
							height="103"
							viewBox="0 0 543 103"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							{/* Red underline path */}
							<path
								d="M168.27 93.1694C182.963 90.4214 196.768 87.837 210.598 85.2473C218.452 83.7711 227.28 82.7622 235.737 81.582C246.259 80.1104 258.431 80.944 270.417 81.4407C310.53 83.1107 348.709 82.3898 385.756 80.3066C420.948 78.3297 454.538 75.3504 483.262 69.683C502.494 65.887 518.233 61.0558 526.712 54.2344C534.665 47.8547 529.421 41.4698 513.603 35.0522C493.345 26.8398 467.262 20.9724 438.7 16.1842C399.893 9.67191 359.926 6.45482 319.399 4.79711C259.999 2.36726 203.685 3.48384 150.167 7.61558C95.6226 11.8289 54.6911 21.1471 28.5684 35.7524C21.9863 39.434 18.6817 43.6036 20.2513 48.308C22.8032 55.9715 38.8413 61.343 60.3893 65.6525C71.8897 67.951 84.2183 69.4424 96.7706 70.3618C119.779 72.0517 142.658 74.0839 165.239 76.9554C167.372 77.2289 169.976 77.4011 170.014 78.2869C170.037 79.0712 167.643 78.9865 165.754 78.9537C133.96 78.3332 101.951 77.9409 69.9777 73.5595C39.2743 69.3515 14.8284 62.8449 4.16036 52.754C-3.70237 45.3272 0.354756 38.8373 9.86164 32.9538C21.1719 25.9552 38.0921 20.4364 57.2563 15.5585C91.4587 6.85255 132.79 7.59989 179.526 5.6703C223.583 3.85015 269.949 -1.52333 316.732 0.413131C370.814 2.64837 423.422 7.63862 472.626 18.3704C493.687 22.9596 512.795 28.1932 527.207 34.858C542.967 42.1401 547.08 49.2018 538.402 56.066C530.852 62.0376 518.068 66.665 502.299 70.5176C479.726 76.0466 452.49 79.3118 423.541 81.703C376.109 85.6197 326.202 86.9545 273.347 85.0905C270.519 84.9878 267.672 84.8191 264.827 84.629C253.641 83.8902 244.156 84.398 235.468 85.9773C211.228 90.3916 188.58 95.4268 164.997 100.091C160.745 100.931 156.102 97.2187 151.501 97.9031C147.367 98.5218 142.923 103.151 138.47 101.751C133.923 100.321 134.662 98.9114 137.221 97.7592C148.447 92.6856 159.863 87.6477 171.28 82.6098C172.875 81.9028 175.142 81.2674 178.694 81.9336C182.46 82.6445 181.401 83.5852 180.69 84.4369C178.75 86.7408 174.951 88.6982 171.438 90.7056C170.259 91.3717 168.435 91.9324 168.345 93.1462L168.27 93.1694Z"
								fill="#F05658"
							/>

							{/* Text element */}
							<text
								x="50%"
								y="60"
								textAnchor="middle"
								className="text-4xl font-medium fill-black mt-9"
								style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
							>
								Frequently asked questions
							</text>
						</svg>
						<p className="text-gray-400 text-xl font-extralight text-center max-w-[550px]">
							These are the commonly asked questions on Allnovas. Still have
							some questions?
							<span className="text-primary"> Email us</span>
						</p>
					</motion.div>
					<motion.div
						className="flex flex-col items-center justify-center mx-auto -gap-4 lg:hidden"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6 }}
					>
						<svg
							width="300"
							height="103"
							viewBox="0 0 543 103"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							{/* Red underline path */}
							<path
								d="M168.27 93.1694C182.963 90.4214 196.768 87.837 210.598 85.2473C218.452 83.7711 227.28 82.7622 235.737 81.582C246.259 80.1104 258.431 80.944 270.417 81.4407C310.53 83.1107 348.709 82.3898 385.756 80.3066C420.948 78.3297 454.538 75.3504 483.262 69.683C502.494 65.887 518.233 61.0558 526.712 54.2344C534.665 47.8547 529.421 41.4698 513.603 35.0522C493.345 26.8398 467.262 20.9724 438.7 16.1842C399.893 9.67191 359.926 6.45482 319.399 4.79711C259.999 2.36726 203.685 3.48384 150.167 7.61558C95.6226 11.8289 54.6911 21.1471 28.5684 35.7524C21.9863 39.434 18.6817 43.6036 20.2513 48.308C22.8032 55.9715 38.8413 61.343 60.3893 65.6525C71.8897 67.951 84.2183 69.4424 96.7706 70.3618C119.779 72.0517 142.658 74.0839 165.239 76.9554C167.372 77.2289 169.976 77.4011 170.014 78.2869C170.037 79.0712 167.643 78.9865 165.754 78.9537C133.96 78.3332 101.951 77.9409 69.9777 73.5595C39.2743 69.3515 14.8284 62.8449 4.16036 52.754C-3.70237 45.3272 0.354756 38.8373 9.86164 32.9538C21.1719 25.9552 38.0921 20.4364 57.2563 15.5585C91.4587 6.85255 132.79 7.59989 179.526 5.6703C223.583 3.85015 269.949 -1.52333 316.732 0.413131C370.814 2.64837 423.422 7.63862 472.626 18.3704C493.687 22.9596 512.795 28.1932 527.207 34.858C542.967 42.1401 547.08 49.2018 538.402 56.066C530.852 62.0376 518.068 66.665 502.299 70.5176C479.726 76.0466 452.49 79.3118 423.541 81.703C376.109 85.6197 326.202 86.9545 273.347 85.0905C270.519 84.9878 267.672 84.8191 264.827 84.629C253.641 83.8902 244.156 84.398 235.468 85.9773C211.228 90.3916 188.58 95.4268 164.997 100.091C160.745 100.931 156.102 97.2187 151.501 97.9031C147.367 98.5218 142.923 103.151 138.47 101.751C133.923 100.321 134.662 98.9114 137.221 97.7592C148.447 92.6856 159.863 87.6477 171.28 82.6098C172.875 81.9028 175.142 81.2674 178.694 81.9336C182.46 82.6445 181.401 83.5852 180.69 84.4369C178.75 86.7408 174.951 88.6982 171.438 90.7056C170.259 91.3717 168.435 91.9324 168.345 93.1462L168.27 93.1694Z"
								fill="#F05658"
							/>

							{/* Text element */}
							<text
								x="50%"
								y="60"
								textAnchor="middle"
								className="text-4xl font-medium fill-black mt-9"
								style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
							>
								Frequently asked questions
							</text>
						</svg>
						<p className="text-gray-400 font-light text-center">
							These are the commonly asked questions on Allnovas. Still have
							some questions?
							<span className="text-primary"> Email us</span>
						</p>
					</motion.div>
					{/* FAQ Items */}
					<FAQTabs />
				</div>
			</div>
		</div>
	);
}
