import React, { useState, useEffect } from "react";
import { Dot } from "lucide-react";
import { Article } from "../../types";
import Breadcrumb from "./Breadcrumb";
import SidebarNav from "./SidebarNav";

interface ArticleReaderProps {
  article: Article;
  categoryTitle: string;
  onBack: () => void;
  onBackToHome: () => void;
}

const formatDate = (date?: Date): string => {
  if (!date)
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  categoryTitle,
  onBack,
  onBackToHome,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  // Scroll-based active section detection
  useEffect(() => {
    const handleScroll = () => {
      if (!article.sections || article.sections.length === 0) {
        return;
      }

      // Get all section elements
      const sections = article.sections.map((section) =>
        document.getElementById(section.id),
      );

      // Find which section is currently in viewport
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          // If section top is above viewport middle, it's the active section
          if (rect.top <= window.innerHeight / 2) {
            setActiveSectionId(article.sections[i].id);
            return;
          }
        }
      }

      // If no section found, set the first one
      if (article.sections.length > 0) {
        setActiveSectionId(article.sections[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Call once on mount to set initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [article.sections]);

  const breadcrumbItems = [
    { label: "Articles", onClick: onBackToHome },
    { label: categoryTitle, onClick: onBack },
    { label: article.title },
  ];

  return (
    <article className='w-full min-h-screen bg-white'>
      {/* Header Section - Full Width */}
      <div className='w-full py-8 md:py-20 lg:py-32 px-4 md:px-6'>
        <div className='max-w-6xl mx-auto'>
          {/* Breadcrumb Navigation */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Article Metadata */}
          <div className='flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600 mb-4 md:mb-6'>
            <span className='flex items-center gap-2'>
              Published by{" "}
              <img
                src='/images/allnova.png'
                alt={article.author}
                className='w-8 h-8 rounded-full'
              />{" "}
              <span className='font-bold'>{article.author}</span>
            </span>
            <span className='inline-block py-1 font-medium'>
              {categoryTitle}
            </span>
            <span className='hidden sm:inline'>
              <Dot className='w-16 h-16 text-input' />
            </span>
            <span>{formatDate(article.publishedDate)}</span>
            <span className='hidden sm:inline'>
              <Dot className='w-16 h-16 text-input' />
            </span>
            <span>{article.readTime} minutes read</span>
          </div>

          {/* Article Title */}
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 md:mb-8 leading-tight'>
            {article.title}
          </h1>

          {/* Article Description */}
          {article.description && (
            <p className='text-gray-600 text-base md:text-lg mb-8 leading-relaxed'>
              {article.description}
            </p>
          )}
        </div>
      </div>

      {/* Featured Image - Full Width */}
      {article.image && (
        <div className='w-full px-4 md:px-6 mb-8 md:mb-12'>
          <div className='rounded-2xl max-w-6xl mx-auto overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gray-200'>
            <img
              src={article.image}
              alt={article.title}
              className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'
            />
          </div>
        </div>
      )}

      {/* Content Section with Sidebar - Same Row */}
      <div className='w-full py-8 md:py-12 lg:py-16 px-4 md:px-6'>
        <div className='max-w-5xl mx-auto flex gap-8 lg:gap-12'>
          {/* Main Content */}
          <div className='flex-1 min-w-0'>
            {/* Article Sections */}
            {article.sections && article.sections.length > 0 ? (
              <div className='space-y-8 md:space-y-12'>
                {article.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className='scroll-mt-20'
                  >
                    <h2 className='text-xl md:text-2xl font-semibold text-gray-darker mb-4'>
                      {section.title}
                    </h2>
                    <div className='text-gray-dark leading-relaxed space-y-4'>
                      {typeof section.content === "string" ? (
                        <p className='whitespace-pre-wrap'>{section.content}</p>
                      ) : (
                        <div>{section.content}</div>
                      )}
                    </div>

                    {/* Subsections */}
                    {section.subsections && section.subsections.length > 0 && (
                      <div className='mt-6 space-y-4'>
                        {section.subsections.map((subsection, idx) => (
                          <div key={idx}>
                            <h3 className='text-lg font-semibold text-gray-dark mb-2'>
                              {subsection.title}
                            </h3>
                            <div className='text-gray-dark leading-relaxed whitespace-pre-wrap'>
                              {subsection.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                ))}
              </div>
            ) : (
              article.content && (
                <div className='prose prose-sm md:prose-base max-w-none'>
                  <p className='text-gray-dark leading-relaxed text-base md:text-lg whitespace-pre-wrap mb-6 md:mb-8'>
                    {article.content}
                  </p>
                </div>
              )
            )}
          </div>

          {/* Sidebar Navigation */}
          {article.sidebarItems && (
            <SidebarNav
              items={article.sidebarItems}
              activeId={activeSectionId}
            />
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticleReader;
