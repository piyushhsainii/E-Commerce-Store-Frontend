// import React, { Fragment, useEffect, useRef, useState } from 'react'
// import CheckOutSteps from '../../Cart/CheckOutSteps'
// import MetaData from '../MetaData'
// import { Typography } from '@mui/core'
// import { useAlert } from 'react-alert'
// import {
//     CardNumberElement,
//     CardCvcElement,
//     CardExpiryElement,
//     useStripe,
//     useElements,
//     Elements,
// }
//     from "@stripe/react-stripe-js"
// import { CreditCard, Event, Security, SecurityOutlined, VpnKey } from '@mui/icons-material'
// import "./payment.css"
// import axios from 'axios'
// import { useDispatch, useSelector } from 'react-redux'
// import alert from 'alert'
// import { clearErrors , orderAction } from '../actions/OrderAction'


// const Payment = ({history}) => {
//     const orderInfo = JSON.parse(sessionStorage.getItem("OrderInfo"))
//     const shippingInfo = JSON.parse(localStorage.getItem("ShippingInfo"))

//     const paymentData= {
//         amount : Math.round(orderInfo.grossTotal * 100 )
//     }

//     const payBtn = useRef(null)
//     const alert = useAlert()
//     const dispatch = useDispatch()

//     const stripe = useStripe();
//     const elements = useElements();

//     const { user  } = useSelector((state)=> state.user)
//     const { error } = useSelector((state)=>state.newOrder)
//     const { cartItems } = useSelector((state)=>state.cart)


//     const submitHandler =  async(e)=>{
//         e.preventDefault()
//         console.log('button is presed')
//         payBtn.current.disabled = true
//         try {
//         const config = {
//             headers:{
//                 "Content-Type":"application/json",
//             },
//         }
//             console.log('ok')
//             const { data } = await axios.post('http://localhost:5000/payment/process', 
//             amount,
//             config
//             )
//             console.log(data)
//             history.push(`${data.url}`)  
//         } catch (error) {
//             payBtn.current.disabled = false
//         console.log('button is presed', "catch ka hu")

//         }
//     }    

//     useEffect(()=>{
//         if(error){
//             alert.error(error)
//             dispatch(clearErrors)
//         }
//     },[dispatch,error,alert])

//     return (
//         <Fragment  >
//         <MetaData title={"Payment"} ></MetaData>    
//          <div className="payment-fragment"
//          >
//         <CheckOutSteps activeStep={2} />
//          <Typography style={{fontSize:"2vmax"}} className='card-info' >Card Info</Typography>
//         <div className='payment-container' >
//          <CreditCard />
//          <CardNumberElement className='paymentInput'  />
//         </div>
//         <div className='payment-container' >
//          <SecurityOutlined />
//          <CardCvcElement  className='paymentInput' />
//         </div>
//         <div className='payment-container' >
//          <VpnKey/>
//         <CardExpiryElement  className='paymentInput' />
//         </div>
//         <input type="submit" className='payment-pay-btn'
//         value={`Pay : ${orderInfo && orderInfo.grossTotal}`}
//         ref={payBtn}
//         onClick={submitHandler}
//         />
//         </div>
//     </Fragment>
//         )
// }

// export default Payment