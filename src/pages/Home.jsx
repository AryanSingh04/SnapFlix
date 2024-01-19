import React from 'react'
import Hero from '../components/Hero'
import Explore from '../components/Explore'
import DiscoverSkeleton from '../components/DiscoverSkeleton'

const Home = () => {
  return (
    <div className="w-screen h-fit">
    <Hero/>
    <Explore url="trending/all" title="Trending" options={["day","week"]} option={true}/>
    <Explore url="discover" title="Popular" options={["movie","tv"]} type={true} option={true}/>
    </div>
  )
}

export default Home