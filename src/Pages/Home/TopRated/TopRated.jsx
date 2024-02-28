import React, { useState } from 'react'
import useFetch from '../../../Hooks/UseFetch';
import ContentWrapper from '../../../Components/ContentWrapper/ContentWrapper';
import { Container, Row } from 'react-bootstrap';
import Tabs from '../../../Components/Tabs/Tabs';
import Carousel from '../../../Components/Carousel/Carousel';

const TopRated = () => {
    const [endpoint,setEndPoint] = useState('movie');
    const {data,loading}= useFetch(`/${endpoint}/top_rated`);
    // console.log(data);
    const onTabChange = (tab) =>{
        setEndPoint(tab === 'Movies' ? 'movie' : 'tv');
    }
  return (
    <div className='carousel-section'>
        <ContentWrapper>
            <Container>
                <Row>
                    <div className='col-12 text-center'>
                        <h2 className='carousel-title'>Top Rated Movies</h2>
                    </div>
                </Row>
            </Container>
            <Tabs data={["Movies","Tv Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default TopRated