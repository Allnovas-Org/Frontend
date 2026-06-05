import React, { useState, useCallback } from "react";
import { Article } from "../../types";
import { ChevronRight, ArrowLeft, Search } from "lucide-react";
import HelpSearch from "./HelpSearchInput";

interface HelpCategoryListProps {
  title: string;
  articles: Article[];
  onArticleSelect: (article: Article) => void;
  onBack: () => void;
  onSearch: (query: string) => void;
}

const HelpCategoryList: React.FC<HelpCategoryListProps> = ({
  title,
  articles,
  onArticleSelect,
  onBack,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Optimized filtering with memoization effect
  const filteredArticles = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return articles;
    }

    const query = searchQuery.toLowerCase();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.description?.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query),
    );
  }, [articles, searchQuery]);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      onSearch(query);
    },
    [onSearch],
  );

  return (
    <article className='w-full min-h-screen bg-white py-20 md:py-24 lg:py-32 px-4 md:px-6'>
      <div className='max-w-6xl mx-auto'>
        {/* Navigation Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 md:gap-6 mb-8 md:mb-12'>
          {/* Left: Back Button with "Help" Label */}
          <button
            onClick={onBack}
            className='flex items-center gap-2 text-gray-dark hover:text-gray-darker transition-colors text-sm md:text-base font-medium'
            aria-label='Go back to help'
          >
            <ArrowLeft className='w-4 h-4 md:w-5 md:h-5' />
            Help and Support
          </button>

          {/* Right: Search Bar */}
          <div className='w-full sm:w-auto'>
            <HelpSearch
              onSearch={handleSearch}
              placeholder='Search in this category...'
            />
          </div>
        </div>

        <div className='px-0 md:px-36 lg:px-32'>
          {/* Title */}
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-8 md:mb-12'>
            {title}
          </h2>

          {/* Articles List */}
          {filteredArticles.length > 0 ? (
            <div className='space-y-3 md:space-y-4'>
              {filteredArticles.map((article) => (
                <button
                  key={article.id}
                  onClick={() => onArticleSelect(article)}
                  className='w-full group relative overflow-hidden border border-gray-200 rounded-xl p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between bg-white hover:bg-gray-50 hover:border-red-600 transition-all duration-300 active:scale-95 text-left'
                  aria-label={`Read ${article.title}`}
                >
                  {/* Content */}
                  <div className='flex-1 min-w-0 mb-3 sm:mb-0'>
                    <h3 className='text-base md:text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2'>
                      {article.title}
                    </h3>
                    <div className='flex flex-wrap gap-2 md:gap-4 mt-2 text-xs md:text-sm text-gray-600'>
                      <span>{article.readTime} min read</span>
                      <span className='hidden sm:inline'>•</span>
                      <span className='hidden sm:inline'>
                        By {article.author}
                      </span>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className='shrink-0 text-gray-400 group-hover:text-red-600 transition-colors'>
                    <ChevronRight className='w-5 h-5 md:w-6 md:h-6' />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className='text-center py-12'>
              <Search className='w-12 h-12 text-gray-300 mx-auto mb-4' />
              <p className='text-gray-500'>
                No articles found in this category.
              </p>
              <p className='text-gray-400 text-sm mt-2'>
                Try adjusting your search terms
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default HelpCategoryList;
