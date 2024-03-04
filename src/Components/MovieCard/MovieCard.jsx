import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PosterImg from '../../assets/no-image.jpg';
import Img from '../LazyLoadImage/Img';
import Rating from '../Rating/Rating';
import dayjs from 'dayjs';
import './style.scss';

const MovieCard = ({data,fromSearch,mediaType}) => {
    const {url} = useSelector((state)=> state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path ? url.poster + data.poster_path : PosterImg

  return (
    <div className='movie-card' onClick={()=> navigate(`/${data.media_type || mediaType}/${data.id}`)}>

            <div className='movie-poster'>
                <Img src={posterUrl} className='poster-img'/>
                {!fromSearch && (
                    <React.Fragment>
                        <Rating rating={data.vote_average.toFixed(1)}/>
                    </React.Fragment>
                )}
            </div>
            <div className='movie-text'>
                <div className='title'>{data.title || data.name}</div>
                <div className='date'>
                    {dayjs(data.release_date).format("MMM d, YYYY")}
                </div>
            </div>
    </div>
  )
}

export default MovieCard;