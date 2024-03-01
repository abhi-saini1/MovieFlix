import React from 'react'
import useFetch from '../../../Hooks/UseFetch';
import Carousel from '../../../Components/Carousel/Carousel';

const Similar = ({mediaType,id}) => {
    const {data,loading,error} = useFetch(`/${mediaType}/${id}/similar`);
    const title = mediaType === 'tv' ? "Similar Tv Show" : 'Similar Movies';
  return (
    <Carousel
        title={title}
        data={data?.results}
        loading={loading}
        endpoint={mediaType}
    />
  )
}

export default Similar