import React from "react";
import LegalPage from "./LegalPage";

const PrivacyPolicy: React.FC = () => (
  <LegalPage
    title="Allnova Privacy Policy"
    relatedPage={{ title: "Terms of Service", path: "/terms-of-service" }}
    sections={[
      {
        id: "introduction",
        title: "Introduction",
        content: (
          <>
            <p>Allnova Digital LTD (“Allnova,” “we,” “our,” or “us”) is a digital platform designed to connect freelancers, clients, businesses and professionals with opportunities, resources and services.</p>
            <p>This Privacy Policy explains how we collect, use, protect and manage personal information when you visit allnovas.com or use our services.</p>
          </>
        ),
      },
      {
        id: "information-we-collect",
        title: "Information We Collect",
        content: (
          <>
            <p>Depending on the services you use and the features available, we may collect:</p>
            <ul>
              <li>Personal information, including your name, email address, telephone number, date of birth, gender and country of residence.</li>
              <li>Account credentials and authentication information.</li>
              <li>Professional information, including skills, qualifications, work experience, portfolios and service preferences.</li>
              <li>Business information, including company details, industry and website information.</li>
              <li>Identity and address verification documents where verification is required and available.</li>
              <li>Project information, proposals, communications and uploaded materials.</li>
              <li>Transaction and billing information when payment services become available.</li>
              <li>Technical information associated with accessing and using our platform.</li>
            </ul>
          </>
        ),
      },
      {
        id: "how-we-use-your-information",
        title: "How We Use Your Information",
        content: (
          <>
            <p>We process personal information for purposes including:</p>
            <ul>
              <li>Creating and managing user accounts.</li>
              <li>Connecting freelancers with clients and business opportunities.</li>
              <li>Facilitating project management and communication.</li>
              <li>Providing customer support.</li>
              <li>Verifying identities where applicable.</li>
              <li>Preventing fraud, abuse and unauthorized access.</li>
              <li>Improving platform functionality and user experience.</li>
              <li>Facilitating transactions where payment functionality is available.</li>
              <li>Meeting legal and regulatory obligations.</li>
            </ul>
          </>
        ),
      },
      {
        id: "legal-basis-for-processing",
        title: "Legal Basis for Processing",
        content: <p>Where applicable, we process personal information based on consent, contractual necessity, compliance with legal obligations and legitimate interests, subject to applicable data protection requirements.</p>,
      },
      {
        id: "information-sharing",
        title: "Information Sharing",
        content: (
          <>
            <p>Information may be shared with other users where necessary to provide platform services, and with authorized service providers supporting hosting, infrastructure, communications, security, verification and payment services.</p>
            <p>We may also disclose information where required by law or where necessary to protect the rights and safety of users.</p>
            <p>Allnova does not sell personal information.</p>
          </>
        ),
      },
      {
        id: "google-services-and-backup-infrastructure",
        title: "Google Services and Backup Infrastructure",
        content: (
          <>
            <p>Allnova is configuring Google Drive as part of its internal backup infrastructure. Automated backups are not yet operational.</p>
            <p>Any Google Drive access configured for the backup application is intended for company-controlled backup operations, not for accessing the personal Google Drive accounts of Allnova platform users.</p>
            <p>Allnova's use and transfer of information received from Google APIs will adhere to the Google API Services User Data Policy, including its Limited Use requirements where applicable.</p>
          </>
        ),
      },
      {
        id: "cookies-and-browser-storage",
        title: "Cookies and Browser Storage",
        content: (
          <>
            <p>Allnova uses browser storage and similar technologies to support authentication, account sessions, platform functionality and user preferences.</p>
            <p>Additional technologies may be introduced as the platform develops. Where legally required, appropriate notices and consent mechanisms will be provided.</p>
          </>
        ),
      },
      {
        id: "data-security",
        title: "Data Security",
        content: (
          <>
            <p>Allnova takes reasonable technical and organizational measures to protect personal information against unauthorized access, loss, misuse and disclosure.</p>
            <p>However, no digital system can guarantee absolute security.</p>
          </>
        ),
      },
      {
        id: "data-retention",
        title: "Data Retention",
        content: <p>Retention periods, including for any future backups, are subject to applicable legal requirements.</p>,
      },
      {
        id: "international-data-transfers",
        title: "International Data Transfers",
        content: (
          <>
            <p>Allnova serves users in Nigeria and other countries. Personal information may be processed outside a user's country of residence through authorized infrastructure and service providers.</p>
            <p>Where applicable, international transfers will be subject to appropriate legal safeguards.</p>
          </>
        ),
      },
      {
        id: "your-privacy-rights",
        title: "Your Privacy Rights",
        content: (
          <>
            <p>Subject to applicable law, users may have the right to:</p>
            <ul>
              <li>Access their personal information.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of personal information.</li>
              <li>Object to or restrict certain processing activities.</li>
              <li>Withdraw consent where processing relies on consent.</li>
              <li>Request data portability where applicable.</li>
              <li>Submit a complaint to a relevant data protection authority.</li>
            </ul>
            <p>Requests may be submitted through our official contact email.</p>
            <p>Users in Nigeria may also submit complaints to the Nigeria Data Protection Commission.</p>
          </>
        ),
      },
      {
        id: "young-users",
        title: "Young Users",
        content: (
          <>
            <p>Allnova is intended for individuals aged 16 and above.</p>
            <p>Users under 18 must obtain parental or legal guardian consent.</p>
            <p>Age-restricted services must not be made available without appropriate safeguards and compliance with applicable age and legal capacity requirements.</p>
            <p>Individuals below the minimum age must not register.</p>
          </>
        ),
      },
      {
        id: "third-party-services",
        title: "Third-Party Services",
        content: <p>Our platform may contain links to external websites or services. Their privacy practices are governed by their respective policies.</p>,
      },
      {
        id: "changes-to-this-policy",
        title: "Changes to This Policy",
        content: <p>We may update this Privacy Policy as our services, technology and legal obligations evolve. Material changes will be communicated where required.</p>,
      },
      {
        id: "contact-information",
        title: "Contact Information",
        content: (
          <>
            <p>For privacy inquiries, complaints or requests concerning personal information, contact:</p>
            <p>Allnova Digital LTD</p>
            <p>Lagos, Nigeria</p>
            <p>Email: <a href="mailto:allnovafreelance@gmail.com">allnovafreelance@gmail.com</a></p>
            <p>Website: <a href="https://allnovas.com">https://allnovas.com</a></p>
          </>
        ),
      },
    ]}
  />
);

export default PrivacyPolicy;
