import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, quantity) => async(dispatch, getState)=> {
   const { data } = await axios.get(`https://e-commerce-my-store.onrender.com/product/${id}`)
    const {name , price, Stock} = data.data

    const cartValue = {
        product : data.data._id,
        name,
        price,
        image: data.data.images[0].url,
        Stock,
        quantity

    }

    dispatch({
        type: ADD_TO_CART,
        payload : cartValue
    })

    localStorage.setItem("cartItems", JSON.stringify( getState().cart.cartItems))

}

export const RemoveFromCart = (id, quantity) => async(dispatch, getState)=> {
   
    dispatch({
        type: REMOVE_FROM_CART,
        payload:id
    })
    localStorage.setItem("cartItems", JSON.stringify( getState().cart.cartItems))
}

export const ShippingInfoAction = (data)=>  async(dispatch,getState) => {
    dispatch({
        type : SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem("ShippingInfo", JSON.stringify( getState().cart.shippingInfo))

}