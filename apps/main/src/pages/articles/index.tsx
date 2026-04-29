import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Article, ArticleCategory } from "../../types";
import ArticleHero from "./ArticleHero";
import CategoryGrid from "./CategoryGrid";
import CategoryList from "./CategoryList";
import ArticleReader from "./ArticleReader";
import {
  ARTICLE_CATEGORIES,
  ARTICLES_BY_CATEGORY,
  ALL_ARTICLES,
} from "./data/articlesData";

type ViewState = "home" | "category" | "article";

interface ArticlePageState {
  currentView: ViewState;
  selectedCategory: { id: string; title: string; subtitle: string } | null;
  selectedArticle: Article | null;
  searchQuery: string;
}

const ArticlesPage: React.FC = () => {
  const [pageState, setPageState] = useState<ArticlePageState>({
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
   * Optimized article filtering with memoization
   * Filters articles based on search query and current category
   */
  const filteredArticles = useMemo(() => {
    let articles: Article[] = [];

    // Select articles from category or all articles
    if (pageState.selectedCategory?.id) {
      articles = ARTICLES_BY_CATEGORY[pageState.selectedCategory.id] || [];
    } else {
      articles = ALL_ARTICLES;
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

  /**
   * Optimized category filtering with memoization
   * Filters categories based on search query
   */
  const filteredCategories = useMemo(() => {
    // Return all categories if no search query
    if (!pageState.searchQuery.trim()) {
      return ARTICLE_CATEGORIES;
    }

    // Perform optimized search with lowercase conversion done once
    const query = pageState.searchQuery.toLowerCase();
    return ARTICLE_CATEGORIES.filter(
      (category) =>
        category.title.toLowerCase().includes(query) ||
        category.subtitle.toLowerCase().includes(query),
    );
  }, [pageState.searchQuery]);

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
          subtitle:
            ARTICLE_CATEGORIES.find((c) => c.id === categoryId)?.subtitle || "",
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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutId) {
        clearTimeout(searchTimeoutId);
      }
    };
  }, [searchTimeoutId]);

  return (
    <main className='w-full min-h-screen bg-white'>
      {/* Home View - Hero + Categories */}
      {pageState.currentView === "home" && (
        <>
          <ArticleHero onSearch={handleSearch} />
          <CategoryGrid
            categories={filteredCategories}
            onCategorySelect={handleCategorySelect}
          />
        </>
      )}

      {/* Category View - List of Articles */}
      {pageState.currentView === "category" && pageState.selectedCategory && (
        <CategoryList
          title={pageState.selectedCategory.title}
          subtitle={pageState.selectedCategory.subtitle}
          articles={filteredArticles}
          onArticleSelect={handleArticleSelect}
          onBack={handleBackToHome}
          onSearch={handleCategorySearch}
        />
      )}

      {/* Article View - Full Article Reader */}
      {pageState.currentView === "article" && pageState.selectedArticle && (
        <ArticleReader
          article={pageState.selectedArticle}
          categoryTitle={pageState.selectedCategory?.title || ""}
          onBack={handleBackToCategory}
          onBackToHome={handleBackToHome}
        />
      )}
    </main>
  );
};

export default ArticlesPage;
