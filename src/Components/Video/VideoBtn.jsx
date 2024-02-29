import React from 'react'
import ReactPlayer from 'react-player'
import './style.scss';
import { RxCross1 } from "react-icons/rx";
const VideoBtn = ({show,setShow,videoId,setVideoId}) => {
    const hide = ()=>{
        setShow(false);
        setVideoId(null);
    }
  return (
    <div className={`video ${show ? "visible" : ""}`}>
        <div className='opacityLayer' onClick={hide}></div>
        <div className='videoplayer'>
            <RxCross1 onClick={hide}/>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                controls
                width="100%"
                height="100%"
                
            />
        </div>
    </div>
  )
}

export default VideoBtn