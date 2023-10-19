import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import PropTypes from 'prop-types'

function Categories() {
  return (
    <div>
        <h2>Event Categories</h2>
        <div className='bg-[#d9d9d9]'>
          <div>
            <FaArrowLeft />
            <FaArrowRight />
          </div>
        </div>
    </div>
  )
}


export default Categories
