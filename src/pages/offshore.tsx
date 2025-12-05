import React from "react";  
import HeroSection from "../components/offshore/HeroSection";
import ProjectHighlight from "../components/offshore/ProjectHighlight";
import IndustryServe from "../components/offshore/IndustryServe";
import Review from "../components/offshore/Review";
import Faq from "../components/offshore/Faq";
import GlobalButton from "../components/button/GlobalButton";

export default function OffshorePage() {
  return (
    <>
    <div >

        <HeroSection />
        <ProjectHighlight />
        <IndustryServe />
        <Review />
        <Faq />

    </div>

    
        <section className="w-full py-20 md:py-28 bg-gradient-to-b from-purple-950 via-purple-950 to-purple-900 text-center relative overflow-hidden">

      {/* Light heading above */}
      <p className="text-red-500 text-sm font-semibold tracking-wider mb-3">
        LIKE WHAT YOU SEE?
      </p>

      {/* Main title */}
      <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
        Let’s Bring Your Idea To Life
      </h2>

      {/* Subtitle */}
      <p className="text-gray-300 max-w-2xl mx-auto mb-8 px-4">
        Partner with AllNovas Offshore Services and accelerate your digital
        transformation today.
      </p>

      <div className="flex justify-center">
        <GlobalButton color="bg-red-500 hover:bg-red-600">
            Start a Project
        </GlobalButton>
    </div>


    </section>
      

    </>
  );
};
