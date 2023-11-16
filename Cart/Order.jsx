import React, { Fragment } from 'react'
import "./Order.css"
import { CheckBox, CheckCircle } from '@material-ui/icons'
import { Typography } from '@material-ui/core'
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
     <CheckCircle style={{color:"green", width:"5vmax", height:"5vmax"}} />
     <Typography> Your Order has been placed ! </Typography> 
     </div>
     <div>
        <Link to="/MyOrders"> VIEW ORDERS </Link>
     </div>
    </div>
   </Fragment>
  )
}

export default Order