import React from 'react'
import './style.scss';
import Banner from './HomeBanner/Banner'
import Trending from './Trending/Trending'

const Home = () => {
  return (
    <div>
        <Banner/>
        <Trending/>
    </div>
  )
}

export default Home