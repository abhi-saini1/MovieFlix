import React from 'react'
import DetailsBanner from './DetailsBanner/DetailsBanner'
import useFetch from '../../Hooks/UseFetch'
import { useParams } from 'react-router-dom'


const Details = () => {
  // const [mediaType,id] = useParams();
  // const {data,loading} = useFetch(`/${mediaType}/${id}/videos`);
  return (
    <>
      <DetailsBanner/>
    </>
  )
}

export default Details