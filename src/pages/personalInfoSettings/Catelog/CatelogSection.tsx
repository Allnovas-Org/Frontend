import React, { useState } from "react";
import CreateCatalogue from "./CreateCatalogue";
import { Pencil } from "lucide-react";
import Pagination from "../../../components/Pagination";
import ServiceCard from "../../../components/ServiceCard";
import { Service } from "../../../types";
import GigPreviewHeader from "./GigPreviewHeader";
import ImageCarousel from "./ImageCarousel";
import PricingTable from "./PricingTable";
import ToolBadge from "./ToolBadge";
import ReviewSection from "./ReviewSection";
import PortfolioSection from "./PortfolioSection";
import OtherCatalogues from "./OtherCatalogues";

const SERVICES_DATA: Service[] = [
  {
    id: "1",
    image: "/images/applicants/proj1.png",
    title:
      "You will get Wix Expert, Wix Designer Wix website Wix developer Wix Web Design Wix SEO",
    deliveryTime: "2 days",
    price: 200,
  },
  {
    id: "2",
    image: "/images/applicants/proj2.png",
    title: "Another Wix Service Example",
    deliveryTime: "3 days",
    price: 250,
  },
  {
    id: "3",
    image: "/images/applicants/proj3.png",
    title: "Third Wix Service Example",
    deliveryTime: "1 day",
    price: 180,
  },
  {
    id: "4",
    image: "/images/applicants/proj2.png",
    title: "Fourth Wix Service Example",
    deliveryTime: "4 days",
    price: 300,
  },
];

const gigDetails = {
  description:
    "A modern, responsive web application built with best practices.",
  tools: ["React", "Tailwind CSS", "TypeScript"],
  pricing: [
    {
      name: "Basic",
      deliveryTime: "3 days",
      plugins: false,
      pages: "3",
      responsive: true,
      revisions: 1,
      designSystem: false,
      mockup: false,
      price: 200,
    },
    {
      name: "Standard",
      deliveryTime: "5 days",
      plugins: true,
      pages: "5",
      responsive: true,
      revisions: 2,
      designSystem: true,
      mockup: false,
      price: 400,
    },
    {
      name: "Premium",
      deliveryTime: "7 days",
      plugins: true,
      pages: "10",
      responsive: true,
      revisions: 5,
      designSystem: true,
      mockup: true,
      price: 800,
    },
  ],
};

const seller = {
  gigTitle:
    "You will get Wix Expert, Wix Designer Wix website Wix developer Wix Web Design Wix SEO",
  name: "Ajayi Samuel",
  avatarUrl: "/images/applicants/avatar2.png",
  isAvailable: true,
  recommendations: 50,
};
const images = [
  "/images/applicants/preview1.png",
  "/images/applicants/preview2.png",
  "/images/applicants/preview3.png",
  "/images/applicants/preview4.png",
  "/images/applicants/preview5.png",
];

const portfolioItems = [
  {
    id: "1",
    title: "Dashboard UI Design",
    image: "/images/applicants/proj1.png",
  },
  {
    id: "2",
    title: "Landing Page UI Design",
    image: "/images/applicants/proj2.png",
  },
  {
    id: "3",
    title: "Flyer Design",
    image: "/images/applicants/proj3.png",
  },
];
interface CatelogSectionProps {
  setShowCreateCatalogue: (show: boolean) => void;
  onEditCatalogue?: () => void;
  showEdit?: boolean;
}

const CatelogSection: React.FC<CatelogSectionProps> = ({
  setShowCreateCatalogue,
  onEditCatalogue,
  showEdit,
}) => {
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const total = Math.ceil(SERVICES_DATA.length / 4);

  const pagedServices = SERVICES_DATA.slice((page - 1) * 4, page * 4);

  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-gray-800'>Catelog</h3>
        {showEdit && (
          <button
            className='bg-white rounded-full p-1 shadow hover:bg-gray-100 transition'
            onClick={() => {
              setShowCreateCatalogue(true);
              if (onEditCatalogue) onEditCatalogue();
            }}
          >
            <span className='sr-only'>Edit Catelog</span>
            <Pencil className='w-4 h-4 text-gray-600' />
          </button>
        )}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {pagedServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onView={(s) => {
              setSelectedService(s);
              setModalOpen(true);
            }}
          />
        ))}
      </div>
      {modalOpen && selectedService && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
          <div className='relative w-[96vw] max-w-6xl bg-white rounded-2xl shadow-xl py-8 px-36 overflow-y-auto max-h-[96vh]'>
            <button
              className='absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700'
              onClick={() => setModalOpen(false)}
              aria-label='Close'
            >
              &times;
            </button>
            <GigPreviewHeader seller={seller} />
            <ImageCarousel images={images} />
            <section className='mt-10'>
              <h2 className='text-lg font-semibold mb-2'>Gig Details</h2>
              <p className='text-gray-700 mb-4'>{gigDetails.description}</p>
              <div className='flex flex-wrap gap-2 mb-6'>
                {gigDetails.tools.map((tool) => (
                  <ToolBadge key={tool} label={tool} />
                ))}
              </div>
              <PricingTable tiers={gigDetails.pricing} />
              <div className='mt-12'>
                <ReviewSection />
              </div>
              <div className='mt-12'>
                <PortfolioSection items={portfolioItems} />
              </div>
              <div className='mt-12'>
                <OtherCatalogues />
              </div>
            </section>
          </div>
        </div>
      )}
      {/* Pagination (bottom left) */}
      <div className='flex justify-start mt-4'>
        <Pagination current={page} total={total} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default CatelogSection;
