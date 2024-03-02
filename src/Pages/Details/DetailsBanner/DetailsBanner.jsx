import React, { useState } from 'react'
import './style.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../../../Hooks/UseFetch';
import { useSelector } from 'react-redux';
import Img from '../../../Components/LazyLoadImage/Img';
import NoImage from '../../../assets/no-image.jpg'
import ContentWrapper from '../../../Components/ContentWrapper/ContentWrapper';
import Rating from '../../../Components/Rating/Rating';
import VideoBtn from '../../../Components/Video/VideoBtn';
import PlayBtn from '../../../Components/Video/PlayBtn';
import dayjs from 'dayjs';

const DetailsBanner = ({video,crew}) => {
    const [show,setShow] = useState(false);
    const[videoId,setVideoId] = useState(null)
    const {mediaType,id} = useParams();
    // console.log(id);
    const {data,loading} = useFetch(`/${mediaType}/${id}`)
    const {url} = useSelector((state)=> state.home);

    const director = crew?.filter((f)=> f.job === 'Director');
    const writer = crew?.filter((f)=> f.job === 'ScreenPlay' || f.job === 'Story' || f.job === 'Writer')
    const RunTimeSet = (totalMinutes) =>{
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`
    }
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
                                <div className='overview'>
                                    <p className='heading'>Overview</p>
                                    <div className='description'>
                                        {data.overview}
                                    </div>
                                </div>
                                <div className='info'>
                                    {data.status &&(
                                        <div className='info-item'>
                                            <div className='text bold'>
                                              Status:{''}
                                              <div className='text'>
                                                {data.status}
                                              </div>
                                            </div>
                                        </div>
                                    )}
                                    {data.release_date &&(
                                        <div className='info-item'>
                                        <div className='text bold'>
                                          Release Date:{''}
                                          <div className='text'>
                                            {dayjs(data.release_date).format('MMM D, YYYY')}
                                          </div>
                                        </div>
                                        
                                    </div>
                                    )}
                                    {data.runtime && (
                                        <div className='info-item'>
                                        <div className='text bold'>
                                          Runtime:{''}
                                          <div className='text'>
                                            {RunTimeSet(data.runtime)}
                                          </div>
                                        </div>
                                        
                                    </div>
                                    )}
                                  </div>  
                                    {director?.length > 0 && (
                                        <div className='info'>
                                            <div className='text bold'>
                                                Director: {''}
                                            </div>
                                            <div className='text'>
                                                {director.map((d,i)=>(
                                                    <div key={i}>
                                                        {d.name}
                                                    {director.length - 1 !== i&& ","}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {writer?.length > 0 && (
                                        <div className='info'>
                                            <div className='text bold'>
                                                Writer: {''}
                                            </div>
                                            <div className='text'>
                                                {writer?.map((d,i)=>(
                                                    <div key={i}>
                                                        {d.name}
                                                    {writer.length - 1 !== i&& ","}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                
                                <div className='rows'>
                                    <Rating rating={data.vote_average.toFixed(1)}/>
                                    <div className='playbtn' onClick={()=>{setShow(true),setVideoId(video.key)}}>
                                        <PlayBtn/>
                                        <span>Watch Trailer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <VideoBtn
                        show={show}
                        setShow={setShow}
                        videoId={videoId}
                        setVideoId={setVideoId}
                        />
                    </ContentWrapper>
                </React.Fragment>
                
             )}
            </>
        ) : (
            <div className='detailsBannerSkeleton'>
                
            </div>
        )}

        
    </div>
  )
}

export default DetailsBanner