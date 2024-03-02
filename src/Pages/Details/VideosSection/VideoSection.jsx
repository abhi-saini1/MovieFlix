import React, { useState } from 'react'
import './style.scss';
import ContentWrappr from '../../../Components/ContentWrapper/ContentWrapper';
import Img from '../../../Components/LazyLoadImage/Img';
import { Container,Row } from 'react-bootstrap';
import PlayBtn from '../../../Components/Video/PlayBtn';
import VideoBtn from '../../../Components/Video/VideoBtn'


const VideoSection = ({data,loading}) => {
    const [show,setShow] = useState(false);
    const [videoId,setVideoId] = useState(null)
  return (
    <div className='video-section'>
        <ContentWrappr>
            <Container>
                <Row>
                    <div className='col-12'>
                        <h2 className='title'>Videos</h2>
                    </div>
                </Row>
            </Container>
            {!loading ? (
                    <div className='video-items'>
                        {data?.results.map((video)=>(
                            <div key={video.id} className='video-item'
                            onClick={()=> {setVideoId(video.key); setShow(true);}}>
                                <div className='video-thumb'>
                                    <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}/>
                                    <PlayBtn/>
                                </div>
                                <div className='video-title'>
                                    {video.name}
                                </div>
                            </div>
                        ))}

                    </div>
            ):(
                <div>

                </div>
            )}
        </ContentWrappr>
        <VideoBtn
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}/>
    </div>
  )
}

export default VideoSection