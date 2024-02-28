import React, { useState } from 'react'
import ContentWrapper from '../../../Components/ContentWrapper/ContentWrapper';
import { Container, Row } from 'react-bootstrap';
import Carousel from '../../../Components/Carousel/Carousel';
import useFetch from '../../../Hooks/UseFetch';
import Tabs from '../../../Components/Tabs/Tabs';

const Trending = () => {
    const [endpoint,setEndPoint] = useState('day');
    const {data,loading} = useFetch(`/trending/all/${endpoint}`);
    const onTabChange = (tab) =>{
        setEndPoint(tab === 'Day' ? 'day' : 'week');
    }
  return (
    <div className='carousel-section'>
        <ContentWrapper>
            <Container>
                <Row>
                    <div className='col-12 text-center'>
                        <h2 className='carousel-title'>Trending Movies</h2>
                    </div>
                </Row>
            </Container>
            <Tabs data={["Day","Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending