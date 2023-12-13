import {
    All_PRODUCT_FAIL,
    All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    CLEAR_ERRORS ,
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    ADD_REVIEW_FAIL,
    PRODUCT_ADMIN_REQUEST,
    PRODUCT_ADMIN_SUCCESS,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
} from '../constants/productConstans.jsx'

import axios from 'axios'
import { ALL_REVIEWS_FAIL, ALL_REVIEWS_REQUEST, ALL_REVIEWS_SUCCESS, DELETE_ADMIN_USER_FAIL, DELETE_ADMIN_USER_REQUEST, DELETE_ADMIN_USER_SUCCESS } from '../constants/userConstants.jsx';

const actionProduct = (keyword="", currentPage=1, price=[0,25000], category ,rating=0) => async (dispatch) => {
    try {
        dispatch({
            type:All_PRODUCT_REQUEST
        });

        let link  = `https://e-commerce-my-store.onrender.com/products?keyword=${keyword}&page=${currentPage}&price[$gte]=${price[0]}&price[$lte]=${price[1]}&ratings[$gte]=${rating}`

        
        if(category){
            link = `https://e-commerce-my-store.onrender.com/products?keyword=${keyword}&page=${currentPage}&price[$gte]=${price[0]}&price[$lte]=${price[1]}&category=${category}&ratings[$gte]=${rating}`
        }
        const {data} = await axios.get(link); 
        
        dispatch({
            type:All_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:All_PRODUCT_FAIL,
            payload: error.response
        })
    }
}
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        });
        const {data} = await axios.get(`https://e-commerce-my-store.onrender.com/product/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({ 
            type:PRODUCT_DETAILS_FAIL, 
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({type:CLEAR_ERRORS});
}

export default actionProduct;


export const AddReviewAction = (reviewData) => async(dispatch)=>{
    
    const config = {
        headers:{
            "Content-Type":"application/json",
            credentials:'include'
        },
      withCredentials: true,      
    }
    try {
        dispatch({
            type:ADD_REVIEW_REQUEST
        })

        const { data} = await axios.put('https://e-commerce-my-store.onrender.com/review',
        reviewData,
        config
        )
        dispatch({
            type:ADD_REVIEW_SUCCESS,
            payload:data.sucess
        })

    } catch (error) {
        dispatch({
            type:ADD_REVIEW_FAIL,
            payload:error.message
        })
    }
}
export const AddNewProduct = (productData) => async(dispatch)=>{
    
    const config = {
        headers:{
            "Content-Type":"application/json",
            credentials:'include'
        },
      withCredentials: true,      
    } 
    try {
        dispatch({
            type:NEW_PRODUCT_REQUEST
        })

        const { data} = await axios.post('https://e-commerce-my-store.onrender.com/addProducts',
        productData,
        config
        )
        dispatch({
            type:NEW_PRODUCT_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:NEW_PRODUCT_FAIL,
            payload:error.message
        })
    }
}
export const getAdminProducts = () => async(dispatch)=>{
    
    const config = {
        headers:{
            "Content-Type":"application/json",
            credentials:'include'
        },
      withCredentials: true,      
    }
    try {
        dispatch({
            type:PRODUCT_ADMIN_REQUEST
        })

        const { data} = await axios.get('https://e-commerce-my-store.onrender.com/admin/products',
        config
        )
        dispatch({
            type:PRODUCT_ADMIN_SUCCESS,
            payload:data.productCount 
        })

    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.message
        })
    }
}
export const updateProducts = (id, productData) => async(dispatch)=>{
    
    const config = {
        headers:{
            "Content-Type":"application/json",
            credentials:'include'
        },
      withCredentials: true,      
    }
    try {
        dispatch({
            type:PRODUCT_UPDATE_REQUEST
        })

        const { data} = await axios.put(`https://e-commerce-my-store.onrender.com/product/${id}`,
        productData,
        config
        )
        dispatch({
            type:PRODUCT_UPDATE_SUCCESS,
            payload:data.sucess 
        })

    } catch (error) {
        dispatch({
            type:PRODUCT_UPDATE_FAIL,
            payload:error.message
        })
    }
}
export const deleteProducts = (id) => async(dispatch)=>{
    
    const config = {
        headers:{
            "Content-Type":"application/json",
            credentials:'include'
        },
      withCredentials: true,      
    }
    try {
        dispatch({
            type:PRODUCT_DELETE_REQUEST
        })

        const { data} = await axios.delete(`https://e-commerce-my-store.onrender.com/product/${id}`,
        config
        )
        dispatch({
            type:PRODUCT_DELETE_SUCCESS,
            payload:data.sucess 
        })

    } catch (error) {
        dispatch({
            type:PRODUCT_DELETE_FAIL,
            payload:error.message
        })
    }
}


export const getAllReviews = (id) => async(dispatch)=>{
    
    const config = {
        headers:{
            "Content-Type":"application/json",
            credentials:'include'
        },
      withCredentials: true,      
    }
    try {
        dispatch({
            type:ALL_REVIEWS_REQUEST
        })

        const { data} = await axios.get(`https://e-commerce-my-store.onrender.com/reviews?id=${id}`,
        config
        )
        dispatch({
            type:ALL_REVIEWS_SUCCESS,
            payload:data.review 
        })

    } catch (error) {
        dispatch({
            type:ALL_REVIEWS_FAIL,
            payload:error.message
        })
    }
}
export const deleteAllReviews = (id,productID) => async(dispatch)=>{
    
    const config = {
        headers:{
            "Content-Type":"application/json",
            credentials:'include'
        },
      withCredentials: true,      
    }
    try {
        dispatch({
            type:DELETE_ADMIN_USER_REQUEST
        })

        const { data} = await axios.delete(`https://e-commerce-my-store.onrender.com/reviews?id=${id}&productID=${productID}`,
        config
        )
        dispatch({
            type:DELETE_ADMIN_USER_SUCCESS,
            payload:data.sucess 
        })

    } catch (error) {
        dispatch({
            type:DELETE_ADMIN_USER_FAIL,
            payload:error.message
        })
    }
}