import React, { useState, useMemo, useCallback } from "react";
import { HelpCategory, Article } from "../../types";
import HelpHero from "./HelpHero";
import HelpCategoryGrid from "./HelpCategoryGrid";
import HelpCategoryList from "./HelpCategoryList";
import HelpArticleReader from "./HelpArticleReader";
import HelpContactSection from "./HelpContactSection";
import { HELP_CATEGORIES } from "./data/helpData";
import {
  HELP_ARTICLES_BY_CATEGORY,
  ALL_HELP_ARTICLES,
} from "./data/helpArticlesData";

type ViewState = "home" | "category" | "article";

interface HelpPageState {
  currentView: ViewState;
  selectedCategory: { id: string; title: string; description: string } | null;
  selectedArticle: Article | null;
  searchQuery: string;
}

const HelpPage: React.FC = () => {
  const [pageState, setPageState] = useState<HelpPageState>({
    currentView: "home",
    selectedCategory: null,
    selectedArticle: null,
    searchQuery: "",
  });

  // Debounce timer for search optimization
  const [searchTimeoutId, setSearchTimeoutId] = useState<NodeJS.Timeout | null>(
    null,
  );

  /**
   * Optimized help category filtering with memoization
   * Filters categories based on search query
   */
  const filteredCategories = useMemo(() => {
    // Return all categories if no search query
    if (!pageState.searchQuery.trim()) {
      return HELP_CATEGORIES;
    }

    // Perform optimized search with lowercase conversion done once
    const query = pageState.searchQuery.toLowerCase();
    return HELP_CATEGORIES.filter(
      (category) =>
        category.title.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query),
    );
  }, [pageState.searchQuery]);

  const filteredArticles = useMemo(() => {
    let articles: Article[] = [];

    // Select articles from category or all articles
    if (pageState.selectedCategory?.id) {
      articles = HELP_ARTICLES_BY_CATEGORY[pageState.selectedCategory.id] || [];
    } else {
      articles = ALL_HELP_ARTICLES;
    }

    // Return all articles if no search query
    if (!pageState.searchQuery.trim()) {
      return articles;
    }

    // Perform optimized search with lowercase conversion done once
    const query = pageState.searchQuery.toLowerCase();
    return articles.filter((article) => {
      // Check multiple fields with short-circuit evaluation
      return (
        article.title.toLowerCase().includes(query) ||
        article.description?.toLowerCase().includes(query) ||
        article.content?.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query)
      );
    });
  }, [pageState.selectedCategory, pageState.searchQuery]);

  // Navigation handlers
  const handleSearch = useCallback(
    (query: string) => {
      // Clear previous timeout
      if (searchTimeoutId) {
        clearTimeout(searchTimeoutId);
      }

      // Debounce: wait 300ms after user stops typing
      const newTimeoutId = setTimeout(() => {
        setPageState((prev) => ({
          ...prev,
          searchQuery: query,
          currentView: "home",
          selectedCategory: null,
          selectedArticle: null,
        }));
      }, 300);

      setSearchTimeoutId(newTimeoutId);
    },
    [searchTimeoutId],
  );

  const handleCategorySelect = useCallback(
    (categoryId: string, categoryTitle: string) => {
      setPageState((prev) => ({
        ...prev,
        currentView: "category",
        selectedCategory: {
          id: categoryId,
          title: categoryTitle,
          description:
            HELP_CATEGORIES.find((cat) => cat.id === categoryId)?.description ||
            "",
        },
        selectedArticle: null,
        searchQuery: "",
      }));
    },
    [],
  );

  const handleCategorySearch = useCallback(
    (query: string) => {
      // Clear previous timeout
      if (searchTimeoutId) {
        clearTimeout(searchTimeoutId);
      }

      // Debounce search: wait 300ms after user stops typing
      const newTimeoutId = setTimeout(() => {
        setPageState((prev) => ({
          ...prev,
          searchQuery: query,
        }));
      }, 300);

      setSearchTimeoutId(newTimeoutId);
    },
    [searchTimeoutId],
  );

  const handleArticleSelect = useCallback((article: Article) => {
    setPageState((prev) => ({
      ...prev,
      currentView: "article",
      selectedArticle: article,
    }));
  }, []);

  const handleBackToHome = useCallback(() => {
    setPageState((prev) => ({
      ...prev,
      currentView: "home",
      selectedCategory: null,
      selectedArticle: null,
      searchQuery: "",
    }));
  }, []);

  const handleBackToCategory = useCallback(() => {
    setPageState((prev) => ({
      ...prev,
      currentView: "category",
      selectedArticle: null,
    }));
  }, []);

  const handleEmailClick = useCallback(() => {
    console.log("Email support clicked");
    // Implement email navigation or open email client
  }, []);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (searchTimeoutId) {
        clearTimeout(searchTimeoutId);
      }
    };
  }, [searchTimeoutId]);

  return (
    <main className='w-full min-h-screen bg-white'>
      {/* Home View - Hero + Categories + Contact */}
      {pageState.currentView === "home" && (
        <>
          <HelpHero onSearch={handleSearch} />
          <HelpCategoryGrid
            categories={filteredCategories}
            onCategorySelect={handleCategorySelect}
          />
          <HelpContactSection onEmailClick={handleEmailClick} />
        </>
      )}

      {/* Category View - List of Articles */}
      {pageState.currentView === "category" && pageState.selectedCategory && (
        <HelpCategoryList
          title={pageState.selectedCategory.title}
          articles={filteredArticles}
          onArticleSelect={handleArticleSelect}
          onBack={handleBackToHome}
          onSearch={handleCategorySearch}
        />
      )}

      {/* Article View - Full Article Reader */}
      {pageState.currentView === "article" && pageState.selectedArticle && (
        <HelpArticleReader
          article={pageState.selectedArticle}
          categoryTitle={pageState.selectedCategory?.title || ""}
          onBack={handleBackToCategory}
          onBackToHome={handleBackToHome}
        />
      )}
    </main>
  );
};

export default HelpPage;
