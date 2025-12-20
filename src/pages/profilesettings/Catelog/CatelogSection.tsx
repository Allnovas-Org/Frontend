import React, { useState } from "react";
import GigPreviewHeader from "./GigPreviewHeader";
import ImageCarousel from "./ImageCarousel";
import PricingTable from "./PricingTable";
import ToolBadge from "./ToolBadge";
import ReviewSection from "./ReviewSection";
import PortfolioSection from "./PortfolioSection";
import OtherCatalogues from "./OtherCatalogues";
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
import { Pencil, Clock } from "lucide-react";
import Pagination from "../../../components/Pagination";

const CatelogSection: React.FC = () => {
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const total = 2;

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
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-gray-800'>Catelog</h3>
        <button className='bg-white rounded-full p-1 shadow hover:bg-gray-100 transition'>
          <span className='sr-only'>Edit Catelog</span>
          <Pencil className='w-4 h-4 text-gray-600' />
        </button>
      </div>
      <div className='flex flex-col gap-4'>
        {[1, 2].map((i) => (
          <div
            key={i}
            className='flex bg-gray-50 rounded-lg shadow-sm p-4 gap-4 items-start w-3xl h-64'
          >
            <img
              src='/images/applicants/cat1.png'
              alt={`Catelog ${i}`}
              className='w-72 h-full object-cover rounded-lg'
            />
            <div className='flex-1 flex flex-col justify-between h-full'>
              <div>
                <h4 className='font-semibold text-gray-900'>Catelog Title</h4>
                <div className='flex justify-between'>
                  <p className='text-gray-500 text-sm'>From: Acme Corp</p>
                  <p className='text-xs text-gray-400 mt-1'>
                    <Clock className='inline w-3 h-3 mr-1' /> Duration: 6 months
                  </p>
                </div>
              </div>
              <button
                className='mt-2 ml-auto bg-transparent text-primary px-7 py-3 border border-primary rounded-lg text-xs flex items-center gap-1 hover:bg-transparent transition'
                onClick={() => setModalOpen(true)}
              >
                View Project
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for project details */}
      {modalOpen && (
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
