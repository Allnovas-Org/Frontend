import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getAdminSession } from "./adminAuth";

type RequireAdminProps = {
  children: ReactNode;
};

export default function RequireAdmin({ children }: RequireAdminProps) {
  if (getAdminSession()?.user_role !== "admin") {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
