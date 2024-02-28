import React, { useState } from 'react'
import useFetch from '../../../Hooks/UseFetch';
import ContentWrapper from '../../../Components/ContentWrapper/ContentWrapper';
import Tabs from '../../../Components/Tabs/Tabs';
import Carousel from '../../../Components/Carousel/Carousel';

const Popular = () => {
    const [endpoint,setEndPoint] = useState('movie');
    const {data,loading} = useFetch(`/${endpoint}/popular`);
    // console.log(data);
    const onTabChange = (tab) =>{
        setEndPoint(tab === 'Movies' ? 'movie' : 'tv');
    }
  return (
    <div className='carousel-section'>
        <ContentWrapper>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 text-center'>
                        <h2 className='carousel-title'>Popular Movies</h2>
                    </div>
                </div>
            </div>
            <Tabs data={['Movies','Tv Shows']} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default Popular