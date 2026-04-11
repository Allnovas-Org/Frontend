import React from "react";
import { ArticleCategory } from "../../types";
import {
  Rocket,
  Briefcase,
  Palette,
  Star,
  Users,
  Lightbulb,
} from "lucide-react";

interface CategoryGridProps {
  categories: ArticleCategory[];
  onCategorySelect: (categoryId: string, categoryTitle: string) => void;
}

// Map category IDs to lucide icons
const getCategoryIcon = (categoryId: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    "get-started": <Rocket className='w-6 h-6' />,
    freelancing: <Briefcase className='w-6 h-6' />,
    creator: <Palette className='w-6 h-6' />,
    "skill-set": <Star className='w-6 h-6' />,
    hiring: <Users className='w-6 h-6' />,
    general: <Lightbulb className='w-6 h-6' />,
  };
  return iconMap[categoryId] || <Lightbulb className='w-6 h-6' />;
};

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onCategorySelect,
}) => {
  return (
    <section className='w-full py-8 md:py-4 lg:py-4 px-4 md:px-6 bg-white'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id, category.title)}
              className='group relative overflow-hidden border border-input rounded-2xl p-6 md:p-8 text-left bg-white hover:shadow-lg hover:border-primary transition-all duration-300 active:scale-95'
              aria-label={`View ${category.title} articles`}
            >
              {/* Icon */}
              <div className='text-gray-dark mb-4 group-hover:text-primary group-hover:scale-110 transition-all duration-300'>
                {getCategoryIcon(category.id)}
              </div>

              {/* Title */}
              <h3 className='text-lg md:text-xl font-semibold text-gray-darker group-hover:text-primary transition-colors'>
                {category.title}
              </h3>

              {/* Subtitle */}
              <p className='text-sm md:text-base text-gray-dark mt-2'>
                {category.subtitle}
              </p>

              {/* Count */}
              <span className='inline-block mt-4 text-xs md:text-sm text-gray-dark bg-gray-light px-3 py-1 rounded-full'>
                {category.count} {category.count === 1 ? "article" : "articles"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
