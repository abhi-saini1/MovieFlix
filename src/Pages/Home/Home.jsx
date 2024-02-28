import React from 'react'
import './style.scss';
import Banner from './HomeBanner/Banner'
import Trending from './Trending/Trending'
import TopRated from './TopRated/TopRated';
import Popular from './Popular/Popular';

const Home = () => {
  return (
    <div>
        <Banner/>
        <Trending/>
        <TopRated/>
        <Popular/>
    </div>
  )
}

export default Home