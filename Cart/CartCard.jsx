import React from 'react'
import MetaData from '../../frontend/src/MetaData'

const CartCard = ( {item,RemoveFromCart} ) => {
  return (
    <>
    <MetaData title="Cart" ></MetaData>
    <div className='cart-card' >
        <div>
            <img src={item.image} alt="image here" />
        </div>
        <div >
            <div className='product-info' > {item.name} </div>
            <div  className='product-info' > Price ₹ {item.price} </div>
            <div  className='product-info-3rd' onClick={()=>RemoveFromCart(item.product)} > Remove </div>
        </div>
    </div>
    </>
  )
}

export default CartCard