import React from "react";
import { useLocation } from "react-router-dom";
import ClientProfileCompletion from "./client/ClientProfileCompletion";
import FreelancerProfileCompletion from "./freelancer/FreelancerProfileCompletion";

const ProfileCompletion: React.FC = () => {
	const location = useLocation();
	const userType = location.state?.userType as "Client" | "Freelancer" | null;

	if (userType === "Freelancer") {
		return <FreelancerProfileCompletion />;
	}

	return <ClientProfileCompletion />;
};

export default ProfileCompletion;