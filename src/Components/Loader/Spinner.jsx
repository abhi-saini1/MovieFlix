import React from 'react'
import './style.scss';

const Spinner = ({initial}) => {
  return (
    <div className={`loadingSpinner ${initial ? "initial" : ""}`}>
        <span className='loading'></span>
    </div>
  )
}

export default Spinner