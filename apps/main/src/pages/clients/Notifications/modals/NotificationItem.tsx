import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import {
	CheckCircleOutline,
	ArchiveOutlined,
	DeleteOutline,
} from "@mui/icons-material";

interface NotificationItemProps {
	id: string;
	type: "job_alert" | "system_alert" | "system_maintenance";
	title: string;
	message: string;
	timestamp: string;
	isNew?: boolean;
	isRead?: boolean;
	onMarkAsRead?: (id: string) => void;
	onArchive?: (id: string) => void;
	onDelete?: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
	id,
	type,
	title,
	message,
	timestamp,
	isNew = false,
	isRead = false,
	onMarkAsRead,
	onArchive,
	onDelete,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMarkAsRead = () => {
		onMarkAsRead?.(id);
		handleClose();
	};

	const handleArchive = () => {
		onArchive?.(id);
		handleClose();
	};

	const handleDelete = () => {
		onDelete?.(id);
		handleClose();
	};

	const getIcon = () => {
		switch (type) {
			case "job_alert":
				return (
					<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
						<svg
							className="w-5 h-5 text-blue-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>
				);
			case "system_alert":
				return (
					<div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
						<svg
							className="w-5 h-5 text-red-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
					</div>
				);
			case "system_maintenance":
				return (
					<div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
						<svg
							className="w-5 h-5 text-yellow-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					</div>
				);
		}
	};

	return (
		<div
			className={`relative bg-white rounded-lg p-4 mb-3 border-2 border-gray-100 hover:border-gray-200 transition-all cursor-pointer ${
				!isRead ? "bg-blue-50/30" : ""
			}`}
		>
			<div className="flex items-start gap-3">
				{getIcon()}
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2 mb-1">
						<h3 className="font-semibold text-gray-900">{title}</h3>
						{isNew && (
							<span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
								New
							</span>
						)}
					</div>
					<p className="text-sm text-gray-600 mb-2">{message}</p>
					<span className="text-xs text-gray-400">{timestamp}</span>
				</div>
				<IconButton
					size="small"
					onClick={handleClick}
					sx={{
						color: "#6b7280",
						"&:hover": {
							backgroundColor: "#f3f4f6",
						},
					}}
				>
					<MoreVert />
				</IconButton>
			</div>

			{/* Options Menu */}
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={(e) => e.stopPropagation()}
				PaperProps={{
					elevation: 3,
					sx: {
						minWidth: 180,
						borderRadius: 2,
						mt: 1,
					},
				}}
			>
				<MenuItem onClick={handleMarkAsRead}>
					<CheckCircleOutline sx={{ mr: 1.5, fontSize: 20 }} />
					Mark as read
				</MenuItem>
				<MenuItem onClick={handleArchive}>
					<ArchiveOutlined sx={{ mr: 1.5, fontSize: 20 }} />
					Archive
				</MenuItem>
				<MenuItem onClick={handleDelete} sx={{ color: "#ef4444" }}>
					<DeleteOutline sx={{ mr: 1.5, fontSize: 20 }} />
					Delete
				</MenuItem>
			</Menu>
		</div>
	);
};

export default NotificationItem;
