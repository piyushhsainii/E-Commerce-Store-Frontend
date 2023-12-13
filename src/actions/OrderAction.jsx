import axios from "axios"
import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAIL,
    GET_ORDER_REQUEST, GET_ORDER_SUCCESS ,GET_ORDER_FAIL
    , CLEAR_ERRORS,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_FAIL,
    ALL_ORDER_FAIL,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS, } from "../constants/OrderConstants"


export const orderAction  = (order)=> async(dispatch)=>{
    const config = {
        headers:{
            "Content-Type":"application/json",
            credentials:'include'
        },
      withCredentials: true,      
    }
    try {
        dispatch({type : ORDER_REQUEST})


        const { data} = await axios.post('https://e-commerce-my-store.onrender.com/createOrder',
        order,
        config
        )

        dispatch({
            type:ORDER_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:CLEAR_ERRORS
        })
    }
}

export const getOrders = ()=> async(dispatch)=>{
        const config = {
            headers:{
                "Content-Type":"application/json",
                credentials:'include'
            },
        withCredentials: true,      
        }
    try {
        dispatch( {
            type:GET_ORDER_REQUEST
        })

        const { data } = await axios.get('https://e-commerce-my-store.onrender.com/myOrders',
        config
        )
        
        dispatch({
            type: GET_ORDER_SUCCESS,
            payload:data.order 
        })

    } catch (error) {
        dispatch({
            type:CLEAR_ERRORS
        })
    }
}
export const AllOrders = ()=> async(dispatch)=>{
        const config = {
            headers:{
                "Content-Type":"application/json",
                credentials:'include'
            },
        withCredentials: true,      
        }
    try {
        dispatch( {
            type:ALL_ORDER_REQUEST
        })

        const { data } = await axios.get('https://e-commerce-my-store.onrender.com/AllOrders',
        config
        )
        
        dispatch({
            type: ALL_ORDER_SUCCESS,
            payload:data.order 
        })

    } catch (error) {
        dispatch({
            type:ALL_ORDER_FAIL,
            payload: data.message
        })
    }
}
export const updateOrders = (id,order)=> async(dispatch)=>{
        const config = {
            headers:{
                "Content-Type":"application/json",
                credentials:'include'
            },
        withCredentials: true,      
        }
    try {
        dispatch( {
            type:UPDATE_ORDER_REQUEST
        })

        const { data } = await axios.put(`https://e-commerce-my-store.onrender.com/updateOrder/${id}`,
        order,
        config
        )
        
        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload:data.sucess 
        })

    } catch (error) {
        dispatch({
            type:UPDATE_ORDER_FAIL
        })
    }
}
export const deleteOrders = (id)=> async(dispatch)=>{
        const config = {
            headers:{
                "Content-Type":"application/json",
                credentials:'include'
            },
        withCredentials: true,      
        }
    try {
        dispatch( {
            type:DELETE_ORDER_REQUEST
        })

        const { data } = await axios.delete(`https://e-commerce-my-store.onrender.com/DeleteOrder/${id}`,
        config
        )
        
        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload:data.sucess 
        })

    } catch (error) {
        dispatch({
            type:DELETE_ORDER_FAIL,
            payload:data.message
        })
    }
}

//clear erros
 export const clearErrors= async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}
