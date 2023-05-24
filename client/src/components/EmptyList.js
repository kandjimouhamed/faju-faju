import React from 'react'
import img from '../assets/img/illustration.svg'

const EmptyList = ({text}) => {
  return (
    <div style={{width: '100%', margin: '1rem auto', textAlign: 'center'}}>
        <h5>{text}</h5>
        <img style={{width: '80%', marginTop: '2rem'}} src={img} alt="Empty page" />
    </div>
  )
}

export default EmptyList