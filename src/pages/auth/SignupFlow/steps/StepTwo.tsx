import React from "react";
import { ArrowLeft, Mail } from "lucide-react";

interface StepTwoProps {
	onNext: (method: "email" | "google" | "linkedin") => void;
	onBack: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onNext, onBack }) => {
	return (
		<div className="flex flex-col h-full">
			<button
				onClick={onBack}
				className="flex items-center gap-2 text-gray-700 mb-6 hover:text-gray-900 transition w-fit"
				aria-label="Go back"
			>
				<ArrowLeft size={20} />
				<span>Back</span>
			</button>

			<h1 className="text-3xl font-bold mb-2">
				Welcome! How would you like to join?
			</h1>

			<div className="space-y-4 mt-8">
				{/* Email Option */}
				<button
					onClick={() => onNext("email")}
					className="w-full py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all flex items-center justify-center gap-3 bg-white"
				>
					<Mail size={20} className="text-gray-600" />
					<span className="font-medium text-gray-700">Continue with email</span>
				</button>

				{/* OR Divider */}
				<div className="flex items-center gap-4 my-6">
					<div className="flex-1 h-px bg-gray-200" />
					<span className="text-sm text-gray-500">OR</span>
					<div className="flex-1 h-px bg-gray-200" />
				</div>

				{/* Google Option */}
				<button
					onClick={() => onNext("google")}
					className="w-full py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all flex items-center justify-center gap-3 bg-white"
				>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path
							d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.8789 15.7789 19.9895 13.221 19.9895 10.1871Z"
							fill="#4285F4"
						/>
						<path
							d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9465L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z"
							fill="#34A853"
						/>
						<path
							d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z"
							fill="#FBBC05"
						/>
						<path
							d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33717L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z"
							fill="#EB4335"
						/>
					</svg>
					<span className="font-medium text-gray-700">Continue with Google</span>
				</button>

				{/* LinkedIn Option */}
				<button
					onClick={() => onNext("linkedin")}
					className="w-full py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all flex items-center justify-center gap-3 bg-white"
				>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path
							d="M18.5236 0H1.47639C0.660764 0 0 0.647222 0 1.44653V18.5535C0 19.3528 0.660764 20 1.47639 20H18.5236C19.3392 20 20 19.3528 20 18.5535V1.44653C20 0.647222 19.3392 0 18.5236 0ZM5.93056 17.0431H2.96528V7.49653H5.93056V17.0431ZM4.44792 6.19514C3.49653 6.19514 2.72569 5.42431 2.72569 4.47292C2.72569 3.52153 3.49653 2.75069 4.44792 2.75069C5.39931 2.75069 6.17014 3.52153 6.17014 4.47292C6.17014 5.42431 5.39931 6.19514 4.44792 6.19514ZM17.0431 17.0431H14.0785V12.4014C14.0785 11.2951 14.0576 9.87153 12.5347 9.87153C10.9903 9.87153 10.7514 11.0757 10.7514 12.3194V17.0431H7.78681V7.49653H10.6319V8.80139H10.6736C11.0729 8.05069 12.0451 7.25764 13.4844 7.25764C16.4896 7.25764 17.0431 9.23542 17.0431 11.8049V17.0431Z"
							fill="#0A66C2"
						/>
					</svg>
					<span className="font-medium text-gray-700">Continue with LinkedIn</span>
				</button>
			</div>
		</div>
	);
};

export default StepTwo;