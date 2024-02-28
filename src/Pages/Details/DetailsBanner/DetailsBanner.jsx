import React from 'react'
import './style.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../../../Hooks/UseFetch';
import { useSelector } from 'react-redux';
import Img from '../../../Components/LazyLoadImage/Img';
import NoImage from '../../../assets/no-image.jpg'
import ContentWrapper from '../../../Components/ContentWrapper/ContentWrapper';


const DetailsBanner = () => {
    const {mediaType,id} = useParams();
    // console.log(id);
    const {data,loading} = useFetch(`/${mediaType}/${id}`)
    const {url} = useSelector((state)=> state.home);
  return (
    <div className='details-banner'>
        {!loading ? (
            <>
             {!!data && (
                <React.Fragment>
                    <div className='background-img'>
                        <Img src={url.backdrop + data.backdrop_path} />
                    </div>
                    <div className='opacity-layer'></div>
                    <ContentWrapper>
                        <div className='details-content'>
                            <div className='left-side'>
                                {data?.poster_path ? (
                                    <Img classname='poster-img'src={url.backdrop + data.poster_path}/>
                                ):(
                                    <Img classname='poster-img' src={NoImage}/>
                                )}
                            </div>
                            <div className='right-side'>
                                <div className='details-title'>
                                    {`${data.name || data.title}`}
                                </div>
                                <div className='details-subtitle'>
                                    {data.tagline}
                                </div>
                            </div>
                        </div>
                    </ContentWrapper>
                </React.Fragment>
                
             )}
            </>
        ) : (
            <div></div>
        )}

        
    </div>
  )
}

export default DetailsBanner