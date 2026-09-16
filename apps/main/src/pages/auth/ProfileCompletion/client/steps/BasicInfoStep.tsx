import React from "react";
import CompanyBasicInfoStep from "./CompanyBasicInfoStep";
import IndividualBasicInfoStep from "./IndividualBasicInfoStep";

interface BasicInfoData {
	companyName: string;
	companySize: string;
	industry: string;
	companyWebsite: string;
	companyDescription: string;
	professionalTitle: string;
	personalWebsite: string;
	aboutYou: string;
}

interface BasicInfoStepProps {
	profileType: "individual" | "company" | null;
	data: BasicInfoData;
	setData: React.Dispatch<React.SetStateAction<BasicInfoData>>;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ profileType, data, setData }) => {
	if (profileType === "individual") {
		return <IndividualBasicInfoStep data={data} setData={setData} />;
	}

	return <CompanyBasicInfoStep data={data} setData={setData} />;
};

export default BasicInfoStep;