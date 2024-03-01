import React from 'react'
import DetailsBanner from './DetailsBanner/DetailsBanner'
import useFetch from '../../Hooks/UseFetch'
import { useParams } from 'react-router-dom'
import Cast from './Cast/Cast'
import VideoSection from './VideosSection/VideoSection'
import Similar from './Similar/Similar'
import Recommendation from './Recommendation/Recommendation'


const Details = () => {
  const {mediaType,id} = useParams();
  const {data,loading} = useFetch(`/${mediaType}/${id}/videos`);
  const {data:credits,loading:creditsLoading} =useFetch(`/${mediaType}/${id}/credits`);
  return (
    <>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideoSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </>
  )
}

export default Details