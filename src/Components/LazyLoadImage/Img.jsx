import React from 'react'
import 'react-lazy-load-image-component'
import {  LazyLoadImage } from 'react-lazy-load-image-component'

const Img = ({src,classname}) => {
  return (
    <LazyLoadImage
        className={classname || ''}
        alt=''
        effect='blur'
        src={src}
    />
  )
}

export default Img