import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import ApplicantsNavbar from "../components/ApplicantsNavbar";
import ApplicantFooter from "../components/Applicants/footer";

interface ApplicantsLayoutProps {
  children: ReactNode;
}

const ApplicantsLayout: React.FC<ApplicantsLayoutProps> = () => (
  <>
    <ApplicantsNavbar />
    <Outlet />
    <ApplicantFooter />
  </>
);

export default ApplicantsLayout;
