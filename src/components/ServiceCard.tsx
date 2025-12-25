import React from "react";
import { Clock } from "lucide-react";
import { Service } from "../types";

interface ServiceCardProps {
  service: Service;
  onView: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onView }) => {
  return (
    <div className='flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-hover hover:shadow-md'>
      {/* Thumbnail */}
      <div className='relative h-48 w-full overflow-hidden'>
        <img
          src={service.image}
          alt={service.title}
          className='h-full w-full object-cover'
        />
      </div>

      {/* Content */}
      <div className='flex flex-col p-4'>
        <h3 className='line-clamp-2 min-h-[3rem] text-sm font-medium text-gray-800 leading-snug'>
          {service.title}
        </h3>

        <div className='mt-3 flex items-center text-xs text-gray-500'>
          <Clock className='mr-1 h-4 w-4' />
          <span>Deliver in {service.deliveryTime}</span>
        </div>

        <hr className='my-4 border-gray-100' />

        {/* Footer */}
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <span className='text-[10px] uppercase tracking-wider text-gray-400'>
              Starting within
            </span>
            <span className='text-lg font-bold text-gray-900'>
              ${service.price}
            </span>
          </div>

          <button
            className='rounded-md border border-purple-600 px-4 py-1.5 text-xs font-semibold text-purple-600 transition-colors hover:bg-purple-50'
            onClick={() => onView(service)}
          >
            View Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
