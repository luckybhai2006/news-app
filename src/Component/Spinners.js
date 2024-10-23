import React from 'react'
import loading from './loading.gif'
// import './newsitem.css';

const Spinner =()=> {
    return (
      <div className='container text-center'> 
        <img className="image" src={loading} alt="loading" style={{maxWidth:'60px'}}/>
      </div>
    )
  }
export default Spinner
