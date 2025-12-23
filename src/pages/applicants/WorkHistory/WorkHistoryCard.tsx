import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Star } from 'lucide-react';

interface WorkHistoryCardProps {
  id: number;
  title: string;
  category: string;
  status: 'Completed' | 'Active' | 'Pending';
  price: string;
  client: string;
  rating: number;
  description: string;
  tools: string[];
  duration: string;
  completedDate: string;
  imageUrl?: string;
}

const WorkHistoryCard: React.FC<WorkHistoryCardProps> = ({
  id,
  title,
  category,
  status,
  price,
  client,
  rating,
  description,
  tools,
  duration,
  completedDate,
  imageUrl,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/applicants/work-history/${id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="bg-white border border-gray-200 rounded-xl p-5 flex gap-6 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all focus:outline-none"
    >
      {/* Image */}
      <div className="w-64 h-44 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Project Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
              {category}
            </span>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full border ${
                status === 'Completed'
                  ? 'text-green-600 border-green-200 bg-green-50'
                  : status === 'Active'
                  ? 'text-blue-600 border-blue-200 bg-blue-50'
                  : 'text-amber-600 border-amber-200 bg-amber-50'
              }`}
            >
              {status}
            </span>
          </div>
          <span className="text-lg font-bold text-gray-900">{price}</span>
        </div>

        {/* Client & Rating */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-600">{client}</span>
          </div>
          <div className="flex items-center gap-1">
            {renderStars(rating)}
            <span className="text-sm text-amber-500 ml-1">{rating}/5</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

        {/* Tools */}
        <div className="flex items-center gap-2 mb-4">
          {tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1.5 border border-gray-200 text-gray-700 text-xs font-medium rounded-full"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Duration: {duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Completed: {completedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkHistoryCard;