import TeamSection from '../../components/TeamSection'


// About Page Section Components
import HeroSection from '../../components/about/HeroSection'

import FeaturesGridSection from '../../components/about/FeaturesGridSection'
import TimelineSection from '../../components/about/TimelineSection'

import StatsSection from '../../components/about/StatsSection'
import FounderMessage from '../../components/about/ValuesSection'


const About = () => {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <HeroSection />


  
      {/* Features Grid Section */}
      <FeaturesGridSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Timeline Section */}
      <TimelineSection />
<FounderMessage/>
   
      {/* Team Section */}
      <TeamSection />

  
    </div>
  )
}

export default About
