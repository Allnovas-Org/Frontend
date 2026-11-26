import React from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import ClientProfileCompletion from "./client/ClientProfileCompletion";
import FreelancerProfileCompletion from "./freelancer/FreelancerProfileCompletion";

const ProfileCompletion: React.FC = () => {
	const location = useLocation();
	const authenticatedUserType = useAuthStore((state) => state.user?.userType);
	const userType =
		(location.state?.userType as "Client" | "Freelancer" | null) ??
		authenticatedUserType;

	if (userType === "Freelancer") {
		return <FreelancerProfileCompletion />;
	}

	return <ClientProfileCompletion />;
};

export default ProfileCompletion;