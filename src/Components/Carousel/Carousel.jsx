import React, { useRef } from 'react'
import Img from '../LazyLoadImage/Img';
import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill} from 'react-icons/bs';
import './style.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
import NoImage from '../../assets/no-image.jpg'
import Rating from '../Rating/Rating';
import dayjs from 'dayjs';


const Carousel = ({data,title,loading,endpoint}) => {
        console.log(data);
    const carouselContainer = useRef();
    const {url} = useSelector((state)=> state.home)
    const navigate = useNavigate();
    const navigation = (dir)=>{
        const container = carouselContainer.current

        const scrollAmount = dir === 'left' ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20)

        container.scrollTo({
            left:scrollAmount,
            behavior: 'smooth'
        })
    }

    const effectItem = ()=>{
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton">

                    </div>
                    <div className="date skeleton">

                    </div>
                </div>
            </div>
        )
    }
  return (
    <div className='carousel'>
        <ContentWrapper>
            {title && 
                <div className='carousel-title'>
                    {title}
                </div>  }
                <BsFillArrowLeftCircleFill className='carouselLeftNav arrow' onClick={()=> navigation('left')}/>
                <BsFillArrowRightCircleFill className='carouselRightNav arrow' onClick={()=> navigation('right')}/>
          
       
        {!loading ?(
                <div className='carousel-items' ref={carouselContainer}>

                {
                    data?.map((item)=>{
                        const posterUrl = item.poster_path ? url.poster + item.poster_path : NoImage;
                        return (
                            <div className='carousel-Item' onClick={()=> navigate(`/${item.media_type || endpoint}/${item.id}`)} key={item.id}>
                                
                                <div className="poster">
                                    <Img src={posterUrl} />

                                    <Rating rating={item.vote_average.toFixed(1)}/>
                                </div>
                                <div className="text">
                                    <span className='title'>
                                    {item.title || item.name}
                                    </span>
                                    <span className='date'>
                                        {dayjs(item.release_Date).format('MMM D, YYYY')}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            ) : (
                <div className='loadingSkeleton'>
                    {effectItem()}
                    {effectItem()}
                    {effectItem()}
                    {effectItem()}
                    {effectItem()}
                </div>
            )}
            
        </ContentWrapper>




      
            
    </div>
  )
}

export default Carousel