import Function from "../innerpages/funtion"
import HeroSection from "../innerpages/hero"
import React from 'react'
import SpecializedNiches from "../innerpages/niches"
import ElevateWorkflow from "../innerpages/flow"
import AllNovaSections from "../innerpages/next2"
import TemplateCommunity from "../innerpages/exibition"
import ArticlesFAQ from "../innerpages/faq"
import AllNovaFooter from "../components/footer"


const home = () => {
  return (
    <div>
        <HeroSection />
        <Function/>
        <SpecializedNiches/>
        <ElevateWorkflow/>
        <AllNovaSections/>
        <TemplateCommunity/>
        <ArticlesFAQ/>
        <AllNovaFooter/>
    </div>
  )
}

export default home