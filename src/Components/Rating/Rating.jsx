import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import './style.scss'

const Rating = ({rating}) => {
  return (
    <div className='rating'>
        <CircularProgressbar
         value={rating}
         text={rating}
         maxValue={10}
         styles={buildStyles({
            pathColor:
            rating < 5  ? 'red' : rating < 6 ? 'orange' : 'green' 
         })}/>
    </div>
  )
}

export default Rating