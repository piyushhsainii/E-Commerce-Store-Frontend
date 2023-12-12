import React, { Fragment } from 'react'
import "./Order.css"
import { CheckBox, CheckCircle, Error, ErrorOutline, StrikethroughS } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import CheckOutSteps from './CheckOutSteps'


const Order = () => {
  return (
   <Fragment >
    <div style={{marginTop:"10vmax"}} >
      <CheckOutSteps activeStep={3} ></CheckOutSteps>
    </div>
    <div className='order-success-father' >
     <div className='order-success-container' >
     <ErrorOutline style={{color:"red", width:"5vmax", height:"5vmax"}} />
     <Typography> Oops, Please Try Again ! </Typography> 
     </div>
     <div>
        <Link to="Orders/Confirm"> RETURN TO CART  </Link>
     </div>
    </div>
   </Fragment>
  )
}

export default Order