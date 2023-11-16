import {
    All_PRODUCT_FAIL,
    All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    CLEAR_ERRORS, 
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    ADD_REVIEW_FAIL,
    ADD_REVIEW_RESET,
    PRODUCT_ADMIN_REQUEST,
    PRODUCT_ADMIN_SUCCESS,
    PRODUCT_ADMIN_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_FAIL,
    NEW_PRODUCT_RESET
} from '../constants/productConstans.jsx'
import { ALL_REVIEWS_FAIL, ALL_REVIEWS_REQUEST, ALL_REVIEWS_SUCCESS, DELETE_REVIEWS_FAIL, DELETE_REVIEWS_REQUEST, DELETE_REVIEWS_RESET, DELETE_REVIEWS_SUCCESS } from '../constants/userConstants.jsx';

export const productReducer = (state={product: []},action)=>{
    switch (action.type) {
        case All_PRODUCT_REQUEST :
            case PRODUCT_ADMIN_REQUEST:
            return {
                loading:true,
                products:[]
            }
        case All_PRODUCT_SUCCESS:
            return {
                loading:false,
                products:action.payload.data,
                productCount:action.payload.productCount,
                resultsPerPage:action.payload.resultsPerPage
            }

        case PRODUCT_ADMIN_SUCCESS:
            return {
                loading:false,
                products:action.payload
            }

        case All_PRODUCT_FAIL:
        case PRODUCT_ADMIN_FAIL:
        return {
                loading:false,
                product:action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default: 
            return state;
    }
};
 export const productDetailsReducer = (state={product: {}},action)=>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST :
            return {
                loading:true,
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading:false,
                product:action.payload.data,
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading:false,
                product:action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default: 
            return state;
    }
};


export const AddReview= ( state={},action)=>{
    switch (action.type) {
        case ADD_REVIEW_REQUEST:
         return {
            ...state,
            loading:true
         }
         case ADD_REVIEW_SUCCESS:
            return {
                ...state,
                loading:false,
                success:action.payload
            }
        case ADD_REVIEW_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
            error:null
        }

        case ADD_REVIEW_RESET:
            return {
              ...state,
              success: false,
            };
        default:
            return state;
    }
}
export const AddProduct = ( state={},action)=>{
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
         return {
            ...state,
            loading:true
         }
         case NEW_PRODUCT_SUCCESS:
            return {
                ...state,
                loading:false,
                success:action.payload.sucess,
                products:action.payload.product
            }
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
            error:null
        }

        case NEW_PRODUCT_RESET:
            return {
              ...state,
              success: false,
            };
        default:
            return state;
    }
}
export const DeleteProduct = ( state={},action)=>{
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
         return {
            ...state,
            loading:false
         }
         case PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                loading:false,
                isDeleted:action.payload
            }
        case PRODUCT_DELETE_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
            ...state,
            error:null
        }

        case PRODUCT_DELETE_RESET:
            return {
              ...state,
              isDeleted: false,
            };
        default:
            return state;
    }
}
export const updateProduct = ( state={},action)=>{
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
         return {
            ...state,
            loading:false
         }
         case PRODUCT_UPDATE_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated:action.payload
            }
        case PRODUCT_UPDATE_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
            ...state,
            error:null
        }

        case PRODUCT_UPDATE_RESET:
            return {
              ...state,
              isUpdated: false,
            };
        default:
            return state;
    }
}


export const AllReviews = (state={reviews:[]},action)=>{
    switch (action.type) {
        case ALL_REVIEWS_REQUEST:
            return {
                ...state,
                loading:true,

            }
        case ALL_REVIEWS_SUCCESS:
            return {
                ...state,
                loading:false,
                reviews:action.payload
            }
        case ALL_REVIEWS_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }   
          
        default:
            return {
                ...state
            }
    }
}
export const UpdateAllReviews = (state={},action)=>{
    switch (action.type) {
        case DELETE_REVIEWS_REQUEST:
            return {
                ...state,
                loading:true,

            }
        case DELETE_REVIEWS_SUCCESS:
            return {
                ...state,
                loading:false,
                isDeleted:action.payload
            }
        case DELETE_REVIEWS_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }   
        case DELETE_REVIEWS_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }   
          
        case DELETE_REVIEWS_RESET:
            return {
                ...state,
                loading:false,
                isUpdated:false
            }   
          
        default:
            return {
                ...state
            }
    }
}