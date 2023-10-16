import React from 'react'
import PropTypes from 'prop-types'
import Hero from '../../components/Home/Hero'
import Featured from '../../components/Home/Featured'
import Categories from '../../components/Home/Categories'

function Home(props) {
  return (
    <>
        <Hero />
        <Featured />
        <Categories />
    </>
  )
}

Home.propTypes = {}

export default Home
