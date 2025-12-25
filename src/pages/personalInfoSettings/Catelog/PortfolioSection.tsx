import React, { useState } from "react";
import PortfolioCard from "./PortfolioCard";
import Pagination from "../../../components/Pagination";
import { PortfolioItem } from "../../../types";

interface PortfolioSectionProps {
  items: PortfolioItem[];
}

const PortfolioSection = ({ items }: PortfolioSectionProps) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;
  const pagedItems = items.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const total = Math.ceil(items.length / itemsPerPage);

  return (
    <section className='mt-16 max-w-5xl'>
      <h3 className='text-lg font-semibold mb-6'>Portfolios</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {pagedItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
      {/* Pagination */}
      <div className='flex justify-end items-center gap-3 mt-10'>
        <Pagination current={page} total={total} onPageChange={setPage} />
      </div>
    </section>
  );
};

export default PortfolioSection;
