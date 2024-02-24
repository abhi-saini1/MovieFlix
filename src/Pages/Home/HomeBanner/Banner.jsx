import React, { useEffect, useState } from 'react'
import Img from '../../../Components/LazyLoadImage/Img';
import ContentWrapper from '../../../Components/ContentWrapper/ContentWrapper';
import { useSelector } from 'react-redux';
import './style.scss';
import FetchData from '../../../Hooks/UseFetch';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';



const Banner = () => {
  const [background,setBackground] = useState("");
  const [query,setQuery] = useState('');
  const navigate = useNavigate();
  const {url} = useSelector((state)=> state.home)
  const {data,loading} = FetchData('/movie/upcoming')


  useEffect(()=>{
    const bgImg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bgImg);
  },[data])

  const searchQueryHandler = (event)=>{
    if(event.key === "Enter" && query.length > 0){
      navigate(`/search/${query}`);
    }
  }
  return (
    <div className='hero-Banner'>
      <Container>
        <Row>
          <div className='col-12'>
            {!loading &&(
              <div className='backdrop-img'>
                <Img src={background}/>
              </div>
            )}
          </div>
        </Row>
        <Row>
            <div className='col-lg-12'>
              <ContentWrapper>
                <div className='heroBanner-Content'>
                  <span className='title'>Welcome</span>
                  <span className='subtitle'>Millions of movies, Tv Shows and people to discover people Explore Now.</span>
                  <div className='searchInput'>
                      <input type='text' onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler} placeholder='Search for movies,TV Shows'/>
                      <button>Search</button>
                  </div>
                </div>
              </ContentWrapper>
            </div>
        </Row>
      </Container>
    </div>
  )
}

export default Banner