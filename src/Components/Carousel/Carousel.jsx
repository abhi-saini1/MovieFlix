import React, { useRef } from 'react'
import Img from '../LazyLoadImage/Img';
import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill} from 'react-icons/bs';
import './style.scss';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/pagination';

// import { FreeMode, Pagination } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import ContentWrapper from '../ContentWrapper/ContentWrapper';

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

    const skItem = ()=>{
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
    // <div className='carousel'>
    //     <ContentWrapper>
    //         {title && <div className='carousel-title'>
    //             {title}
    //         </div>}
    //         <BsFillArrowLeftCircleFill className='carouselLeftNav arrow' onClick={()=> navigation('left')}/>
    //         <BsFillArrowRightCircleFill className='carouselRighttNav arrow' onClick={()=> navigation('right')}/>

    //         {!loading ? (
    //             <div className='carousel-items' ref={carouselContainer}>
    //                 {
    //                     data.map((item)=>{
    //                         const posterUrl = item.poster_path ? url.poster + item.poster_path : '';
    //                         return (
    //                             <div className='carousel-item' key={item.id}>
    //                                 <div className='poster'>
    //                                     <Img src={posterUrl}/>
    //                                 </div>
    //                             </div>
    //                         )
    //                     })
    //                 }
    //             </div>
    //         ) : (
    //             <div className="loadingSkeleton">
    //                 {skItem()} 
    //                 {skItem()} 
    //                 {skItem()} 
    //                 {skItem()} 
    //                 {skItem()} 
    //             </div>
    //         )}
    //     </ContentWrapper>

    // </div>

    // <div className='carousel'>
    // <ContentWrapper>
    //     {title && <div className='carouselTitle'>
    //         {title}</div>}
    //     <BsFillArrowLeftCircleFill className='carouselLeftNav arrow' onClick={()=> navigation('left')}/>
    //     <BsFillArrowRightCircleFill className='carouselRighttNav arrow' onClick={()=> navigation('right')}/>
    //     {!loading ? (
    //         <div className='carouselItems' ref={carouselContainer}>
    //             {
    //                 data?.map((item)=>{
    //                     const posterUrl = item.poster_path ? url.poster + item.poster_path : "";
    //                     return (
    //                         <div className='carouselItem' key={item.id}>
    //                             <div className="posterBlock">
    //                                 <Img src={posterUrl} />
    //                                 {/* <CircleRating rating={item.vote_average.toFixed(1)}/>
    //                                 <Genres data={item.genre_ids.slice(0,2)}/> */}
    //                             </div>
    //                             <div className="textBlock">
    //                                 <span className='title'>
    //                                 {item.title || item.name}
    //                                 </span>
    //                                 <span className='date'>
    //                                     {/* {dayjs(item.release_Date).format("MMM D, YYYY")} */}
    //                                 </span>
    //                             </div>
    //                         </div>
    //                     )
    //                 })
    //             }
    //         </div>
    //     ) : (
    //         <div className="loadingSkeleton">
    //             {skItem()} 
    //             {skItem()} 
    //             {skItem()} 
    //             {skItem()} 
    //             {skItem()} 
    //         </div>
    //     )}
    // </ContentWrapper>
// </div>

    <>
        {data?.map((item)=>{
            const posterUrl = item.poster_path ? url.poster + item.poster_path : "";
            return (
                <div key={item.id}>
                    <Img src={posterUrl}/>
                </div>
            )
        })}
    </>
  )
}

export default Carousel