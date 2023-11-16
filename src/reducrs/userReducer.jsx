import {
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL, 
    CLEAR_ERRORS,
    REG_USER_REQUEST,
    REG_USER_SUCCESS,
    REG_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    CHANGE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_ADMIN_USER_REQUEST,
    ALL_ADMIN_USER_SUCCESS,
    ALL_ADMIN_USER_FAIL,
    GET_ADMIN_USER_REQUEST,
    GET_ADMIN_USER_SUCCESS,
    GET_ADMIN_USER_FAIL,
    UPDATE_ADMIN_USER_REQUEST,
    UPDATE_ADMIN_USER_SUCCESS,
    UPDATE_ADMIN_USER_FAIL,
    UPDATE_ADMIN_USER_RESET,
    DELETE_ADMIN_USER_REQUEST,
    DELETE_ADMIN_USER_SUCCESS,
    DELETE_ADMIN_USER_FAIL,
    DELETE_ADMIN_USER_RESET,

} from '../constants/userConstants'


export const UserReducers = ( state ={user: {}}, action ) =>{
    switch(action.type){
        case ALL_USER_REQUEST :
        case LOAD_USER_REQUEST:
        return{
            loading:true,
            isAuthenticated:false,
        }
        case ALL_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
        return{
            ...state,
            loading:false,
            isAuthenticated:true,
            user:action.payload.user
        }
        case USER_LOGOUT_SUCCESS:
            return {
                loading:false,
                isAuthenticated:false,
                user:null
        }
        case ALL_USER_FAIL :
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                error:action.payload,
                user:null
        }

        case LOAD_USER_FAIL:{
            return {
                loading:false,
                isAuthenticated:false,
                error:action.payload,
                user:null,
            }
        }
        case USER_LOGOUT_FAIL:
            return {
                loading:false,
                isAuthenticated:false,
                error:action.payload
            }

        case CLEAR_ERRORS :
            return {
                ...state,
                error:null
            }
        default:{
            return state
        }
    }
    
}

export const RegisterUser = ( state ={user: {}}, action ) =>{
switch (action.type) {
    case REG_USER_REQUEST:
        return {
            loading:true,
            isAuthenticated:false,
        }        
    case REG_USER_SUCCESS:
        return {
            loading:false,
            isAuthenticated:true,
            user:action.payload.user,
        }        
    case REG_USER_FAIL:
        return {
            loading:false,
            isAuthenticated:false,
            user:null
        }        
    case CLEAR_ERRORS:
        return {
            ...state,
            error:null
        }        

    default:
        return state;
}
}

export const updateProfile = (state={},action)=> {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
        case CHANGE_PASSWORD_REQUEST:
        case UPDATE_ADMIN_USER_REQUEST:
        case DELETE_ADMIN_USER_REQUEST:
            return {
                ...state,
                loading:true,
            }
            case USER_UPDATE_SUCCESS:
        case CHANGE_PASSWORD_SUCCESS:
        case UPDATE_ADMIN_USER_SUCCESS:
        case DELETE_ADMIN_USER_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    isUpdated:action.payload
                }
            case USER_UPDATE_FAIL:
        case CHANGE_PASSWORD_FAIL:
        case UPDATE_ADMIN_USER_FAIL:
        case DELETE_ADMIN_USER_FAIL:
                return {
                    ...state,
                    loading:false,
                    error:action.payload
                }
            case USER_UPDATE_RESET:
            case CHANGE_PASSWORD_RESET:
            case UPDATE_ADMIN_USER_RESET:
            case DELETE_ADMIN_USER_RESET:
                return{
                    ...state,
                    isUpdated:false
                }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error:null
                    } 
        default:
            return state;
    }
}


export const ForgotProfile = (state={}, action)=>{
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading:true
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                message:action.payload,
                loading:false,
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                success:action.payload,
                loading:false,
            }
        case FORGOT_PASSWORD_FAIL:
        case  RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        
        case CLEAR_ERRORS :
            return {
                ...state,
                error:null
            }
        default:
            return state;
    }
}


export const ALLUSERSADMINS = ( state ={user: []}, action ) =>{
    switch (action.type) {
        case ALL_ADMIN_USER_REQUEST:
            return {
                ...state,
                loading:true,
            }        
        case ALL_ADMIN_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                user:action.payload,
            }        
        case ALL_ADMIN_USER_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }        
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }          
        default:
            return state;
    }
    }
export const GETSINGLEUSER = ( state ={user: []}, action ) =>{
    switch (action.type) {
        case GET_ADMIN_USER_REQUEST:
            return {
                loading:true,
            }        
        case GET_ADMIN_USER_SUCCESS:
            return {
                loading:false,
                user:action.payload,
            }        
        case GET_ADMIN_USER_FAIL:
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
            return state;
    }
    }