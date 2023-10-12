import React from 'react'
import PropTypes from 'prop-types'
import Hero from '../../components/Home/Hero'
import Featured from '../../components/Home/Featured'

function Home(props) {
  return (
    <>
        <Hero />
        <Featured />
    </>
  )
}

Home.propTypes = {}

export default Home
