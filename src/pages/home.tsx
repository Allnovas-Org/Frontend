import Function from "../innerpages/funtion"
import HeroSection from "../innerpages/hero"
import React from 'react'
import SpecializedNiches from "../innerpages/niches"
import ElevateWorkflow from "../innerpages/flow"

const home = () => {
  return (
    <div>
        <HeroSection />
        <Function/>
        <SpecializedNiches/>
        <ElevateWorkflow/>
    </div>
  )
}

export default home