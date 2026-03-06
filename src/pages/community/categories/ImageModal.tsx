import React from "react";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface ImageModalProps {
	imageUrl: string;
	onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
	return (
		<div
			className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
			onClick={onClose}
		>
			<IconButton
				onClick={onClose}
				sx={{
					position: "absolute",
					top: 16,
					right: 16,
					color: "white",
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					"&:hover": {
						backgroundColor: "rgba(0, 0, 0, 0.7)",
					},
				}}
			>
				<Close />
			</IconButton>
			<img
				src={imageUrl}
				alt="Full size"
				className="max-w-full max-h-full object-contain"
				onClick={(e) => e.stopPropagation()}
			/>
		</div>
	);
};

export default ImageModal;
