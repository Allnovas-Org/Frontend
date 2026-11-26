import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore, type User } from "../../store/useAuthStore";

interface ProtectedRouteProps {
	isReady: boolean;
	allowedRole?: User["userType"];
	children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	isReady,
	allowedRole,
	children,
}) => {
	const location = useLocation();
	const { user, isAuthenticated, isLoading } = useAuthStore();

	if (!isReady || isLoading) {
		return (
			<div
				className="px-4 py-10 text-center text-sm text-gray-600"
				role="status"
				aria-live="polite"
			>
				Loading your account...
			</div>
		);
	}
	if (!isAuthenticated || !user) {
		return <Navigate to="/" replace state={{ from: location }} />;
	}

	if (allowedRole && user.userType !== allowedRole) {
		return (
			<Navigate
				to={user.userType === "Freelancer" ? "/applicants" : "/clients"}
				replace
			/>
		);
	}

	return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
