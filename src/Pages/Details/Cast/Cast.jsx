import React from 'react'
import { useSelector } from 'react-redux'
import ContentWrapper from '../../../Components/ContentWrapper/ContentWrapper'
import { Container, Row } from 'react-bootstrap'
import Img from '../../../Components/LazyLoadImage/Img'
const Cast = ({data,loading}) => {
    const {url} = useSelector((state)=> state.home)
  return (
    <div className='cast'>
        <ContentWrapper>
            <Container>
                <Row>
                    <div className='col-12'>
                        <h2 className='title'>Top Cast</h2>
                    </div>
                </Row>
            </Container>
            {!loading ?(
                <div className='list-items'>
                    {data?.map((item)=>{
                       let imgUrl = item.profile_path ? url.profile + item.profile_path : "";
                        return(
                            <div className='list-item' key={item.id}>
                                <div className='profile-img'>
                                    <Img src={imgUrl}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div>

                </div>
            )}
           
        </ContentWrapper>
    </div>
  )
}

export default Cast