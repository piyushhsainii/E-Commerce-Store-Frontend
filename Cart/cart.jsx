import React from 'react'
import "../Cart/cart.css"
import CartCard from "../Cart/CartCard.jsx"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, RemoveFromCart } from '../src/actions/cartAction'
import {Link} from "react-router-dom"

const cart = ({history}) => {
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state)=> state.cart)

    const increaseQuantity = (id,quantity, stock )=>{
        const newQty = quantity + 1
        if(stock <= quantity) return ;
        dispatch(addToCart(id,newQty))
    }

    const decreaseQuantity = (id,quantity, stock )=>{
        const newQty = quantity - 1
        if(quantity <= 1) return ;
        dispatch(addToCart(id,newQty))
    }

    const RemoveFromCarty = (id)=>{
        dispatch(RemoveFromCart(id))
    }

    const checkOutHandler = ()=>{
        history.push('/Shipping')
    }

  return (
    <>
    {cartItems.length === 0 ? <div 
        className='emptyCart'
    >
           <div>YOUR CART IS EMPTY </div>
            <Link className="view-products" to="/products" > View Products </Link>
    </div> :
    
    <div className='cart-container' >
        <div className='cart-header ' > 
        <div> Product </div>
        <div> Quantity </div>
        <div> Sub Total </div>
        </div>

        {
            cartItems && cartItems.map((item)=>(
                <>
                <div className='cart-component' >
                <div id='cartcard' >
                <CartCard  id="cartcard" item={item} RemoveFromCart={RemoveFromCarty} />
                </div>
                <div className='quantity-selector' >
                    <button id='minus'
                    onClick={()=> decreaseQuantity(item.product, item.quantity, item.Stock)}
                    > - </button>
                    <input id="count" type="text" readOnly value={item.quantity}  />
                    <button id='minus' 
                    onClick={()=> increaseQuantity(item.product, item.quantity, item.Stock)}
                    > + </button>
    
                </div >
                <div  id='cartcard2' className='sub-total' > ₹  {item.quantity * item.price}  </div>
            </div>
                </>
            ))
        }
            <div className='checkout-container' >
            <div> <div>Gross Total </div>  <div>{ `₹${cartItems.reduce((acc,item)=>
                acc + item.price * item.quantity, 0
            )} `}</div> </div>
            <button onClick={checkOutHandler}  >check out</button>
            </div>

    </div>
    
    }
    </>
  )
}

export default cart