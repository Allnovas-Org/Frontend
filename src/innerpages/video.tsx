import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
	PlayArrow,
	Pause,
	VolumeUp,
	VolumeOff,
	Fullscreen,
	FullscreenExit,
	Close,
	MoreVert,
} from "@mui/icons-material";

export const VideoSection: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [showControls, setShowControls] = useState<boolean>(true);
	const [showShareMenu, setShowShareMenu] = useState<boolean>(false);
	const controlsTimeoutRef = useRef<number | null>(null);

	/* ------------------------------------------------------
	   AUTOPLAY + AUTOPAUSE WHEN ENTERING / LEAVING VIEW
	------------------------------------------------------ */
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];

				if (entry.isIntersecting) {
					// Entering view → play
					video
						.play()
						.then(() => {
							setIsPlaying(true);
						})
						.catch(() => {
							// Autoplay fallback (muted)
							video.muted = true;
							setIsMuted(true);
							video.play().then(() => setIsPlaying(true));
						});
				} else {
					// Leaving view → pause
					video.pause();
					setIsPlaying(false);
				}
			},
			{
				threshold: 0.4, // play/pause when ~40% visible
			},
		);

		observer.observe(video);

		return () => observer.disconnect();
	}, []);
	/* ------------------------------------------------------ */

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleLoadedMetadata = () => setDuration(video.duration);
		const handleTimeUpdate = () => setCurrentTime(video.currentTime);
		const handleEnded = () => setIsPlaying(false);

		video.addEventListener("loadedmetadata", handleLoadedMetadata);
		video.addEventListener("timeupdate", handleTimeUpdate);
		video.addEventListener("ended", handleEnded);

		return () => {
			video.removeEventListener("loadedmetadata", handleLoadedMetadata);
			video.removeEventListener("timeupdate", handleTimeUpdate);
			video.removeEventListener("ended", handleEnded);
		};
	}, []);

	const togglePlay = () => {
		if (!videoRef.current) return;
		if (isPlaying) {
			videoRef.current.pause();
		} else {
			videoRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const toggleMute = () => {
		if (!videoRef.current) return;
		videoRef.current.muted = !isMuted;
		setIsMuted(!isMuted);
	};

	const toggleFullscreen = () => {
		const container = videoRef.current?.parentElement;
		if (!container) return;

		if (!isFullscreen) {
			container.requestFullscreen?.();
		} else {
			document.exitFullscreen?.();
		}
		setIsFullscreen(!isFullscreen);
	};

	const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTime = Number(e.target.value);
		if (videoRef.current) {
			videoRef.current.currentTime = newTime;
			setCurrentTime(newTime);
		}
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	const handleMouseMove = () => {
		setShowControls(true);
		if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);

		controlsTimeoutRef.current = window.setTimeout(() => {
			if (isPlaying) setShowControls(false);
		}, 3000);
	};

	return (
		<section className="shrink-0 max-md:min-h-screen w-full flex flex-col justify-center items-center gap-8 px-4">
			<motion.div
				className="text-center max-w-2xl"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.6 }}
			>
				<h2 className="text-4xl font-medium mb-4">How AllNova Works</h2>
				<p className="text-gray-600 font-light">
					Your Path to Success: From Choosing the Perfect Freelancer to Seamless
					Deliveries at Your Virtual Doorstep!
				</p>
			</motion.div>

			<motion.div
				className="w-full max-w-6xl relative"
				initial={{ opacity: 0, scale: 0.95 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				onMouseMove={handleMouseMove}
				onMouseLeave={() => isPlaying && setShowControls(false)}
			>
				<div className="relative bg-black rounded-lg overflow-hidden shadow-2xl max-w-5xl mx-auto">
					<video
						ref={videoRef}
						className="w-full aspect-video min-h-[200px] max-h-[400px]"
						src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
						onClick={togglePlay}
					/>

					{!isPlaying && (
						<motion.div
							className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
							onClick={togglePlay}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						/>
					)}

					<motion.div
						className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4"
						initial={{ opacity: 1 }}
						animate={{ opacity: showControls ? 1 : 0 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<button onClick={togglePlay} className="text-white">
									{isPlaying ? <Pause /> : <PlayArrow />}
								</button>

								<span className="text-white text-sm font-medium">
									{formatTime(currentTime)} / {formatTime(duration)}
								</span>
							</div>

							<div className="flex items-center gap-3 relative">
								<button onClick={toggleMute} className="text-white">
									{isMuted ? <VolumeOff /> : <VolumeUp />}
								</button>

								<button onClick={toggleFullscreen} className="text-white">
									{isFullscreen ? <FullscreenExit /> : <Fullscreen />}
								</button>

								<button
									onClick={() => setShowShareMenu(!showShareMenu)}
									className="text-white"
								>
									<MoreVert />
								</button>

								{showShareMenu && (
									<motion.div
										className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl p-4 min-w-[200px]"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
									>
										<div className="flex items-center justify-between mb-3">
											<span className="font-semibold text-gray-800">Share</span>
											<button
												onClick={() => setShowShareMenu(false)}
												className="text-gray-500"
											>
												<Close style={{ fontSize: 20 }} />
											</button>
										</div>

										<div className="flex flex-col gap-2">
											<button className="text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">
												Share on Facebook
											</button>
											<button className="text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">
												Share on Twitter
											</button>
											<button className="text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">
												Copy Link
											</button>
											<hr className="my-1" />
											<button className="text-left px-3 py-2 hover:bg-gray-100 rounded text-sm font-medium">
												Download Video
											</button>
										</div>
									</motion.div>
								)}
							</div>
						</div>

						<div className="mb-3">
							<input
								type="range"
								min="0"
								max={duration || 0}
								value={currentTime}
								onChange={handleProgressChange}
								className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
								style={{
									background: `linear-gradient(to right, #dc2626 ${
										(currentTime / duration) * 100
									}%, #4b5563 ${(currentTime / duration) * 100}%)`,
								}}
							/>
						</div>
					</motion.div>

					<div className="absolute top-4 right-4 text-white/70 text-sm font-medium">
						AllNova
					</div>
				</div>
			</motion.div>
		</section>
	);
};

export default VideoSection;
