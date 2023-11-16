import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAIL,
    GET_ORDER_REQUEST,
     GET_ORDER_SUCCESS ,
     GET_ORDER_FAIL ,
    CLEAR_ERRORS,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS ,
    ALL_ORDER_FAIL ,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    UPDATE_ORDER_RESET,
    DELETE_ORDER_RESET

} from "../constants/OrderConstants"

export const OrderReducer = (state={},action)=>{
    switch (action.type) {
        case ORDER_REQUEST:
            return {
                ...state,
                loading:true
            }
       
        case ORDER_SUCCESS:
            return {
                loading:false,
                order:action.payload
            } 
        case ORDER_FAIL:
            return {
                loading:true,
                error:action.payload
            }
            case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }

        default:
           return state
    }
}
export const MyOrder = (state={MyOrders:[]},action)=>{
    switch (action.type) {
        case  GET_ORDER_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                loading:false,
                MyOrders:action.payload
            }
        case GET_ORDER_FAIL:
            return {
                loading:false,
                error:action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
           return state
    }
}
export const AllOrders = (state={MyOrders:[]},action)=>{
    switch (action.type) {
        case  ALL_ORDER_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case ALL_ORDER_SUCCESS:
            return {
                ...state,
                loading:false,
                MyOrders:action.payload
            }
        case ALL_ORDER_FAIL:
            return {
                loading:false,
                error:action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
           return state
    }
}
export const EditOrders = (state={},action)=>{
    switch (action.type) {
        case  UPDATE_ORDER_REQUEST:
        case  DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated:action.payload
            }
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading:false,
                isDeleted:action.payload
            }
        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return {
                loading:false,
                error:action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        case UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated:false
            }
        case DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted:false
            }
        default:
           return state
    }
}
