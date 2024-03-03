import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Select from 'react-select';
import './style.scss';
import { useParams } from 'react-router-dom';
import ContentWrapper from '../../Components/ContentWrapper/ContentWrapper';
import Spinner from '../../Components/Loader/Spinner';
import MovieCard from '../../Components/MovieCard/MovieCard';
import useFetch from '../../Hooks/UseFetch';
import {fetchDataFromApi} from '../../utils/api';


let filters={};

const sortData = [
  {
    value: 'popularity.desc',
    label:'Popularity Descending'
  },
  {
    value: 'popularity.asc',
    label:'Popularity Ascending'
  },
  {
    value: 'vote_average.desc',
    label:'Rating Descending'
  },
  {
    value: 'vote_average.asc',
    label:'Rating Ascending'
  },
  {
    value: 'primary_release_date.desc',
    label:'Release Date Descending'
  },
  {
    value: 'primary_release_date.asc',
    label:'Release Date Ascending'
  },
  {
    value: 'original_title.asc',
    label:'Title (A-Z)'
  },
]
const Explore = () => {
  const [data,setData] = useState(null);
  const [pageNum,setpageNum] = useState(1);
  const [loading,setLoading] = useState(false);
  const [genre,setGenre] = useState(null);
  const [sortby,setSortBy] = useState(null);
  const {mediaType} = useParams();

  const {data:genresData} = useFetch(`/genre/${mediaType}/list`);
    const fetchData = ()=>{
      setLoading(true);
      fetchDataFromApi(`/discover/${mediaType}`,filters)
      .then((res)=>{
        setData(res);
        setpageNum((prev)=> prev + 1)
        setLoading(false);
      });
    };
    const fetchNextPage = ()=>{
      fetchDataFromApi(`/discover/${mediaType}`,filters)
      .then((res)=>{
        if(data?.results){
          setData({
            ...data,results: [...data.results, ...data.results],
          });
        }else{
          setData(res)
        }
        setpageNum((prev)=> prev + 1)
      })
    }

    const OnChange = (selectedItems,action)=>{
      if(action.name === 'sortby'){
        setSortBy(selectedItems);
        if(action.action !== 'clear'){
          filters.sort_by = selectedItems.value;
        }
        else{
          delete filters.sort_by;
        }
      }
      if(action.name === 'genres'){
        setGenre(selectedItems)
        if(action.action !== 'clear'){
          let genreId = selectedItems.map((g)=> g.id);
          genreId = JSON.stringify(genreId).slice(1,-1);
          filters.with_genres = genreId;
        }
        else{
          delete filters.with_genres;
        }
      }
      setpageNum(1);
      fetchData();
    }

    useEffect(()=>{
      filters={};
      setData(null);
      setpageNum(1);
      fetchData()
    },[mediaType])
  return (
    <div className='explore-page'>
      <ContentWrapper>
        <div className='explore-header'>
          <div className='explore-title'>
            {mediaType === 'tv' ? "Explore Tv Show" : "Explore Movies"}
          </div>
          <div className='explore-filters'>
            <Select
              isMulti
              name='genres'
              value={genre}
              options={genresData?.genres}
              closeMenuOnSelect={false}
              getOptionLabel={(option)=> option.name}
              getOptionValue={(option)=> option.value}
              onChange={OnChange}
              placeholder='Select genres'
              className='react-select-container genresDD'
              classNamePrefix='react-select'
            />
            <Select
              name='sortby'
              value={sortby}
              options={sortData}
              onChange={OnChange}
              isClearable={true}
              placeholder='Sort by'
              className='react-select-container sortbyDD'
              classNamePrefix='react-select'
            />
           
          </div>
        </div>
        {loading && <Spinner initial={true}/>}

        {!loading && (
          <>
            {data?.results?.length > 0 ?(
              <InfiniteScroll className='content'
              dataLength={data?.results?.length || []}
              next={fetchNextPage}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner/>}>

                {data?.results?.map((item,i)=>{
                  if(item.media_type === 'person') return
                  return (
                    <MovieCard key={i}
                    data={item}
                    mediaType={mediaType}/>
                  )
                })}
              </InfiniteScroll>
            ): (
              <div className='resultNotFound'>
                Sorry,Results not found !
              </div>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  )
}

export default Explore