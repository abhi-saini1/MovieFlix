import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {fetchDataFromApi} from '../../utils/api';
import ContentWrapper from '../../Components/ContentWrapper/ContentWrapper';
// import NoImgae from '../../assets/no-image.jpg';
import MovieCard from '../../Components/MovieCard/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.scss';
import Spinner from '../../Components/Loader/Spinner';

const SearchResults = () => {
  const [data,setData] = useState(null);
  const [pageNum,setPageNum] = useState(1);
  const [loading,setLoading] = useState(false);
  const {query} = useParams();

  const fetchData = ()=>{
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    .then((res)=>{
      setData(res);
      setPageNum((prev)=> prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPage = ()=>{
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    .then((res)=> {
      if(data?.results){
        setData({
          ...data,results: [...data.results,...res.results]
        })
      }else{
        setData(res)
      }
      setPageNum((prev)=> prev + 1)
    })
  }

  useEffect(()=>{
    setPageNum(1)
    fetchData();
  },[query])
  return (
    <div className='searchResult'>
       {loading && <Spinner initial={true}/>}
       
       {!loading && (
        <ContentWrapper>
          {data?.results.length > 0 ? (
            <>
              <div className='page-title'>
                {`Search ${data?.total_results > 1 ? 'results' : 'results'} of '${query}`}
              </div>
              <InfiniteScroll className='content' dataLength={data?.results.length} next={fetchNextPage} hasMore={pageNum <= data?.total_pages} loader={<Spinner/>}>
              {data?.results.map((item,i)=>{
                if(item.media_type === 'person') return;
                return (
                  <MovieCard key={i} data={item} fromSearch={true}/>
                )
              })}
              </InfiniteScroll>
            </>
          ): (
            <div>
              Sorry, Result Not found
            </div>
          )}
        </ContentWrapper>
       )}
    </div>
  )
}

export default SearchResults