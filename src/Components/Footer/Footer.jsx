import React from 'react'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import { Container, Row } from 'react-bootstrap'
import {FaFacebookF,FaInstagram,FaTwitter, FaLinkedin} from 'react-icons/fa'
import './style.scss';

const Footer = () => {
  return (
    <div className='footer'>
        <ContentWrapper>
            <Container>
                <Row>
                    <div className='col-12'>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non perferendis nam animi modi.</p>
                    </div>
                </Row>
                <Row>
                    <div className='col-12'>
                        <div className='social-icons'>
                                    <span className="icon">
                        <FaFacebookF/>
                    </span>
                    <span className="icon">
                        <FaInstagram/>
                    </span>
                    <span className="icon">
                        <FaTwitter/>
                        </span>
                        <span className="icon">
                        <FaLinkedin/>
                        </span>
                        </div>
                    </div>
                </Row>
            </Container>
        </ContentWrapper>
    </div>
  )
}

export default Footer