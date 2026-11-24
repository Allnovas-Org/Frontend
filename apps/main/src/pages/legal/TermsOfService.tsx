import React from "react";
import { Link } from "react-router-dom";
import LegalPage from "./LegalPage";

const TermsOfService: React.FC = () => (
  <LegalPage
    title="Allnova Terms of Service"
    relatedPage={{ title: "Privacy Policy", path: "/privacy-policy" }}
    sections={[
      {
        id: "introduction-and-acceptance",
        title: "Introduction and Acceptance",
        content: (
          <>
            <p>These Terms of Service govern your access to and use of Allnova, operated by Allnova Digital LTD, Lagos, Nigeria.</p>
            <p>By registering for an account or using our services, you agree to these Terms and our <Link to="/privacy-policy">Privacy Policy</Link>.</p>
          </>
        ),
      },
      {
        id: "about-allnova",
        title: "About Allnova",
        content: (
          <>
            <p>Allnova is a digital platform designed to connect freelancers, clients, businesses and professionals through freelance opportunities, professional development, community engagement and business support services.</p>
            <p>Certain features may be introduced gradually, remain under development or be available only to selected users.</p>
          </>
        ),
      },
      {
        id: "eligibility",
        title: "Eligibility",
        content: (
          <>
            <p>Users must be at least 16 years old.</p>
            <p>Users under 18 must obtain parental or legal guardian consent where required by applicable law.</p>
            <p>Activities involving binding contracts, payments or other regulated services may require users to be at least 18 years old or otherwise possess the necessary legal capacity.</p>
          </>
        ),
      },
      {
        id: "user-accounts",
        title: "User Accounts",
        content: (
          <>
            <p>Users are responsible for:</p>
            <ul>
              <li>Providing accurate and current information.</li>
              <li>Maintaining the confidentiality of their account credentials.</li>
              <li>Protecting their accounts against unauthorized access.</li>
              <li>Notifying Allnova of suspected account misuse.</li>
              <li>Using the platform in accordance with applicable laws.</li>
            </ul>
            <p>Users must not impersonate other individuals or organizations.</p>
          </>
        ),
      },
      {
        id: "freelancer-responsibilities",
        title: "Freelancer Responsibilities",
        content: (
          <>
            <p>Freelancers are expected to:</p>
            <ul>
              <li>Accurately represent their qualifications and experience.</li>
              <li>Deliver agreed services professionally.</li>
              <li>Respect agreed project requirements and deadlines.</li>
              <li>Protect confidential client information.</li>
              <li>Avoid plagiarism, fraud and intellectual property infringement.</li>
              <li>Communicate responsibly with clients.</li>
            </ul>
          </>
        ),
      },
      {
        id: "client-responsibilities",
        title: "Client Responsibilities",
        content: (
          <>
            <p>Clients are expected to:</p>
            <ul>
              <li>Provide accurate project descriptions and requirements.</li>
              <li>Communicate professionally with freelancers.</li>
              <li>Honor agreed contractual and payment obligations.</li>
              <li>Respect freelancers' intellectual property and legal rights.</li>
              <li>Avoid fraudulent, discriminatory or unlawful job postings.</li>
            </ul>
          </>
        ),
      },
      {
        id: "projects-and-service-agreements",
        title: "Projects and Service Agreements",
        content: (
          <>
            <p>Where project and hiring functionality is available, clients and freelancers are responsible for agreeing on project scope, deliverables, timelines, compensation and other relevant conditions.</p>
            <p>Unless expressly stated otherwise, Allnova facilitates connections between users and is not the employer of freelancers or a party to their independent service agreements.</p>
          </>
        ),
      },
      {
        id: "platform-fees",
        title: "Platform Fees",
        content: (
          <>
            <p>Allnova may charge service fees, commissions, subscription fees or other applicable charges depending on the service used.</p>
            <p>Applicable fees will be disclosed before users enter into a chargeable transaction.</p>
            <p>Fees may vary according to the service, transaction type or applicable pricing arrangement.</p>
          </>
        ),
      },
      {
        id: "payments-and-financial-services",
        title: "Payments and Financial Services",
        content: (
          <>
            <p>Payment, wallet, escrow and withdrawal services may be introduced as the platform develops.</p>
            <p>Where available, these services may be subject to additional payment terms and the requirements of authorized third-party payment providers.</p>
            <p>The presence of a payment interface does not constitute a guarantee that payment processing, escrow or withdrawal services are operational.</p>
            <p>Users must not submit financial information through functionality that has not been officially enabled.</p>
          </>
        ),
      },
      {
        id: "refunds-and-cancellations",
        title: "Refunds and Cancellations",
        content: (
          <>
            <p>Refunds and cancellations will be governed by applicable law, the relevant service agreement and any refund policy communicated before a transaction.</p>
            <p>Nothing in these Terms limits mandatory consumer protection rights.</p>
          </>
        ),
      },
      {
        id: "dispute-resolution",
        title: "Dispute Resolution",
        content: (
          <>
            <p>Users are encouraged to resolve disagreements through constructive communication.</p>
            <p>Where direct resolution is unsuccessful, users may contact Allnova to request mediation or assistance.</p>
            <p>If mediation does not resolve the dispute, users may pursue other lawful dispute resolution mechanisms.</p>
            <p>Allnova does not guarantee a particular mediation outcome.</p>
          </>
        ),
      },
      {
        id: "intellectual-property",
        title: "Intellectual Property",
        content: (
          <>
            <p>Allnova's branding, platform design, software and proprietary materials are protected by applicable intellectual property laws.</p>
            <p>Users retain ownership of their original content unless otherwise agreed.</p>
            <p>By submitting content, users grant Allnova the limited permission necessary to host, display and process that content for platform-related purposes.</p>
            <p>Ownership of project deliverables will be determined by the relevant service agreement and applicable law.</p>
          </>
        ),
      },
      {
        id: "prohibited-activities",
        title: "Prohibited Activities",
        content: (
          <>
            <p>Users must not:</p>
            <ul>
              <li>Engage in fraud, scams or impersonation.</li>
              <li>Upload malicious software or harmful content.</li>
              <li>Harass, threaten or unlawfully discriminate against others.</li>
              <li>Infringe intellectual property rights.</li>
              <li>Attempt unauthorized access to accounts or systems.</li>
              <li>Misuse personal information.</li>
              <li>Manipulate reviews, ratings or platform activity.</li>
              <li>Use Allnova for unlawful purposes.</li>
            </ul>
          </>
        ),
      },
      {
        id: "account-suspension-and-termination",
        title: "Account Suspension and Termination",
        content: (
          <>
            <p>Allnova may restrict, suspend or terminate accounts where reasonably necessary to address violations of these Terms, security risks, fraudulent activity or legal obligations.</p>
            <p>Users may request account closure by contacting Allnova.</p>
            <p>Account closure remains subject to outstanding obligations and applicable data retention requirements.</p>
          </>
        ),
      },
      {
        id: "platform-availability-and-beta-services",
        title: "Platform Availability and Beta Services",
        content: (
          <>
            <p>Allnova may introduce, modify, suspend or discontinue features as the platform develops.</p>
            <p>Beta and experimental services may contain errors, experience interruptions or have limited functionality.</p>
            <p>Users should not rely on unconfirmed or experimental features for critical financial or contractual activities.</p>
          </>
        ),
      },
      {
        id: "limitation-of-liability",
        title: "Limitation of Liability",
        content: (
          <>
            <p>To the extent permitted by applicable law, Allnova is not responsible for losses resulting solely from independent agreements between users, unauthorized third-party activities or circumstances outside its reasonable control.</p>
            <p>Nothing in these Terms excludes liability that cannot lawfully be excluded or restricts mandatory consumer rights.</p>
          </>
        ),
      },
      {
        id: "governing-law",
        title: "Governing Law",
        content: <p>These Terms are governed by the applicable laws of the Federal Republic of Nigeria, without prejudice to mandatory legal protections available to users in other jurisdictions.</p>,
      },
      {
        id: "changes-to-these-terms",
        title: "Changes to These Terms",
        content: (
          <>
            <p>Allnova may update these Terms to reflect changes in its services, operations and legal obligations.</p>
            <p>Material changes will be communicated where required.</p>
          </>
        ),
      },
      {
        id: "contact-information",
        title: "Contact Information",
        content: (
          <>
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

export default TermsOfService;
