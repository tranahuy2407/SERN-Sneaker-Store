import React from 'react'
import Hero from '../components/Hero'
import LastestCollection from '../components/LastestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewletterBox from '../components/NewletterBox'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LastestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewletterBox/>
    </div>
  )
}

export default Home