import React from "react";
import { useLocation } from "react-router-dom";
import ClientProfileCompletion from "./client/ClientProfileCompletion";
import FreelancerProfileCompletion from "./freelancer/FreelancerProfileCompletion";

const ProfileCompletion: React.FC = () => {
	const location = useLocation();
	const userType = location.state?.userType as "client" | "freelancer" | null;

	if (userType === "freelancer") {
		return <FreelancerProfileCompletion />;
	}

	return <ClientProfileCompletion />;
};

export default ProfileCompletion;