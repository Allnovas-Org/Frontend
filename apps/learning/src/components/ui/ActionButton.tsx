import { ArrowRight } from "lucide-react"; // Using Lucide for the arrow icons

const ActionButton = ({
	onClick,
	children,
	variant = "primary",
}: {
	onClick?: () => void;
	children: React.ReactNode;
	variant?: "primary" | "secondary";
}) => {
	const baseStyles =
		"flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95";
	const variants = {
		primary: "bg-[#6D11B1] hover:bg-[#5A0E94] text-white",
		secondary: "bg-[#5E12AD] hover:bg-[#4D0E8F] text-white w-fit mx-auto",
	};

	return (
		<button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
			{children}
			<ArrowRight size={18} />
		</button>
	);
};

export default ActionButton;
