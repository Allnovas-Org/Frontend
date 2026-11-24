import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AllNovaFooter from "../../components/footer";

interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageProps {
  title: string;
  sections: LegalSection[];
  relatedPage: { title: string; path: string };
}

const LegalPage: React.FC<LegalPageProps> = ({ title, sections, relatedPage }) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | Allnova`;
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  useEffect(() => {
    let frame = 0;
    const updateScrollState = () => {
      frame = 0;
      setShowBackToTop(window.scrollY > 400);
      let current = sections[0]?.id;
      for (const section of sections) {
        const heading = document.getElementById(section.id);
        if (heading && heading.getBoundingClientRect().top <= 128) {
          current = section.id;
        }
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1]?.id;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  return (
    <>
      <main className="bg-white">
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-11 lg:py-14">
            <nav aria-label="Page navigation" className="mb-5">
              <Link
                to="/"
                className="text-sm font-medium text-gray-600 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                &larr; Back to Home
              </Link>
            </nav>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Allnova legal
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-heading sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <div className="mt-4 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950">
              <strong>Draft notice:</strong> This document is a draft and has
              not yet received final legal approval.
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 lg:py-16">
          <nav
            aria-label={`${title} table of contents`}
            className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-y-auto"
          >
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                On this page
              </h2>
              <ol className="mt-4 space-y-3">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      aria-current={activeSection === section.id ? "location" : undefined}
                      className={`block rounded text-sm leading-6 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
                        activeSection === section.id ? "font-semibold text-primary" : "text-gray-700"
                      }`}
                    >
                      {index + 1}. {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="min-w-0 space-y-10 sm:space-y-12">
            {sections.map((section, index) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2
                  id={section.id}
                  tabIndex={-1}
                  className="scroll-mt-24 text-xl font-semibold text-heading outline-offset-4 sm:text-2xl"
                >
                  {index + 1}. {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-7 text-gray-700 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-primary [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
                  {section.content}
                </div>
              </section>
            ))}
            <p className="border-t border-gray-200 pt-8 text-base">
              <Link
                to={relatedPage.path}
                className="font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {relatedPage.title}
              </Link>
            </p>
          </article>
        </div>
      </main>
      <AllNovaFooter />
      {showBackToTop && (
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            })
          }
          className="fixed bottom-5 right-5 z-40 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          Back to top
        </button>
      )}
    </>
  );
};

export default LegalPage;
