import React from 'react'
import PropTypes from 'prop-types'
import PulseLoader from "react-spinners/PulseLoader";
import '../LoaderComponent/LoaderComponent.css';
const LoaderComponent = ({loader=true}) => {
  return (
    <>
      <section className='loader-cnt'>
        <PulseLoader color={'#a73939'} loading={loader} size={50} speedMultiplier={1} />
      </section>
    </>
  )
}

LoaderComponent.propTypes = {
  loader: PropTypes.bool.isRequired
}

export default LoaderComponent