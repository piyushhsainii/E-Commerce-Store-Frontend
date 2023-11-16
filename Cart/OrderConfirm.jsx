import React, { Fragment, useEffect } from 'react'
import { Link} from 'react-router-dom'
import MetaData from '../src/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import CheckOutSteps from './CheckOutSteps'
import "./OrderConfirm.css"
import { Typography } from '@material-ui/core'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { orderAction} from '../src/actions/OrderAction'
import { ShippingInfoAction} from '../src/actions/cartAction'

const OrderConfirm = ({history, location}) => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const { cartItems } = useSelector((state)=> state.cart)
    const { user } = useSelector((state)=> state.user)

    const shippingInfo =  JSON.parse( localStorage.getItem("ShippingInfo"))
    const subtotal = cartItems.reduce((acc, item)=>
    acc + item.quantity * item.price,0
    )
    // console.log(subtotal, "i am subtotal")
    const tax = subtotal * 0.18

    const shippingCharges = subtotal > 1000 ? 0 : 200

    const grossTotal = subtotal + tax + shippingCharges
    const orderInfo = JSON.parse(sessionStorage.getItem("OrderInfo"))
    const paymentData= {
        amount : Math.round(grossTotal ) * 100,
        quantity: cartItems.length,

    }

    const order = {
        shippingInfo,
        orderItems:cartItems,
        paidAt: new Date(Date.now()),
        itemsprice: subtotal,
        taxPrice:tax,
        Shippingprice:shippingCharges,
        Totalprice:grossTotal
    }


    const proceedToPayment = async()=>{
        const data = {
            subtotal,
            tax,
            shippingCharges,
            grossTotal
        }

        sessionStorage.setItem("OrderInfo", JSON.stringify(data) )
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    credentials:'include'
                },
                withCredentials: true,      
            }
                const { data } = await axios.post('http://localhost:5000/payment/process', 
                paymentData,
                config
                )
                window.location.href = data.url
                console.log(data)         
                try {
                    dispatch( orderAction(order) )  
                } catch (error) {
                    console.log(error,'lol')
                }

    } catch(error) {
        alert.error(error.response.data.error)
    }

    useEffect(()=>{

    },[dispatch])

    }
  return (
    <Fragment>
        <MetaData title={"Confirm Order"} ></MetaData>
        <div className='BAAP' >
        <div className='baap-container' >
            <div className='userShippingInfo' >
            <CheckOutSteps activeStep={1}  />
            <div className='user-info-subcontainer-1' >
            <Typography style={{fontSize:"1.6vmax", paddingBottom:"1vmax"}} > YOUR CART ITEMS</Typography>
            <div className='CART-ITEM-SPACE' >
                <b>Name : </b> <span> {user.name} </span>
            </div>
            <div className='CART-ITEM-SPACE' >
                <b>Phone :  </b>  <span> {shippingInfo.phoneNo} </span> 
            </div>
            <div className='CART-ITEM-SPACE' >
                <b> Address : </b> <span> {shippingInfo.address} </span>        
            </div>
            <div className='' >
                <p></p>
            <span></span>
            </div>
            </div>
            </div>
            <div className='userShippingInfo-2'>
                <div className='shippinginfo-container-2' >
                <Typography style={{fontSize:"1.6vmax", paddingBottom:"1vmax"}} > YOUR CART ITEMS</Typography>
                {cartItems.map((item)=>
                <div className='cart-summary' key={item.product} > 
                    <img className='summary-image'  src={item.image} alt="" />
                    <Link className="productLink" to= {`/product/${item.product}`} >  {item.name} </Link>
                    <span> {item.quantity} X {item.price} = {" "} </span>
                    <b> ₹ {item.price * item.quantity} </b>
                </div>
                )}
                </div>
            </div>
        </div>
        <div className='wife-container' >
        <Typography style={{marginBottom:"4vmax",fontSize:"1.6vmax", paddingBottom:"1vmax" ,borderBottom:"1px solid rgb(59, 59, 59)" , width:"19vmax", textAlign:"center" }}  > ORDER SUMMARY </Typography>

        <div >
            <div>SUB TOTAL: </div>  <div>₹ {subtotal} </div>
        </div>
            <div>
                <div>GST:</div>  <div> ₹ {tax}</div>
            </div>
            <div>
                <div> Shipping Charges   : </div> <div> ₹ {shippingCharges} </div>
            </div>
            <div style={{borderTop:"1px solid grey"}} >
                <div>Total : </div> <div> ₹ {grossTotal}</div>
            </div>
                <button onClick={proceedToPayment}  className='proceed' > Proceed to Payment</button>
        </div>

        </div>
    </Fragment>
  )
}

export default OrderConfirm