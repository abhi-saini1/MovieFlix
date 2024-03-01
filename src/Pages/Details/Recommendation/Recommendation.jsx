import React from 'react'
import useFetch from '../../../Hooks/UseFetch';
import Carousel from '../../../Components/Carousel/Carousel';

const Similar = ({mediaType,id}) => {
    const {data,loading,error} = useFetch(`/${mediaType}/${id}/recommendations`);
  return (
    <Carousel
        title='Recommendation'
        data={data?.results}
        loading={loading}
        endpoint={mediaType}
    />
  )
}

export default Similar