import { 
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    CLEAR_ERRORS,
    REG_USER_FAIL,
    REG_USER_REQUEST,
    REG_USER_SUCCESS,
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
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    ALL_ADMIN_USER_REQUEST,
    ALL_ADMIN_USER_SUCCESS,
    ALL_ADMIN_USER_FAIL,
    GET_ADMIN_USER_SUCCESS,
    GET_ADMIN_USER_FAIL,
    GET_ADMIN_USER_REQUEST,
    UPDATE_ADMIN_USER_SUCCESS,
    UPDATE_ADMIN_USER_REQUEST,
    UPDATE_ADMIN_USER_FAIL,
    DELETE_ADMIN_USER_SUCCESS,
    DELETE_ADMIN_USER_REQUEST,
    DELETE_ADMIN_USER_FAIL,
} from '../constants/userConstants'

import axios from 'axios'

const config = {
    headers:{"Content-Type":"application/json",
    credentials:'include'
    },
    withCredentials: true,
    }
export const userAction = (email,password)=>async(dispatch)=>{

    
    try {
    dispatch({
        type:ALL_USER_REQUEST
    })     
    const {data} =  await axios.post(' http://localhost:5000/login',
     {email,password} ,config
     )    
    dispatch({
        type:ALL_USER_SUCCESS,
        payload: data
    })

    } catch (error) {
        dispatch({
            type:ALL_USER_FAIL,
            payload: error.response
        })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({type:CLEAR_ERRORS});
}


export const registerUser = (myForm) => async(dispatch)=>{
    try {
        dispatch({
            type:REG_USER_REQUEST
        })

        const {data} = await axios.post('http://localhost:5000/register',
        myForm,
        {
            headers:{"Content-Type":"multipart/form-data"},
            withCredentials: true,
            httpOnly:true
        }
        )

        dispatch({
            type:REG_USER_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:REG_USER_FAIL
        })
    }
}

export const loadUser = ()=>async(dispatch)=>{
    try {
    dispatch({
        type:LOAD_USER_REQUEST
    })     
     const {data} =  await axios.get('http://localhost:5000/Myprofile',
     config
     )

    dispatch({
        type:LOAD_USER_SUCCESS,
        payload: data
    })

    } catch (error) {
        dispatch({
            type:LOAD_USER_FAIL,
            payload: error.response 
        })
    }
}


//Logout User

export const logout = ()=> async(dispatch) =>{
    try {
        await axios.get('http://localhost:5000/logout',
        config
        
        )
        dispatch({
            type:USER_LOGOUT_SUCCESS
        })

    } catch (error) {
        dispatch({
           type: USER_LOGOUT_FAIL,
           payload:error.response
        })
    }
}

export const updateProfile = (myForm) => async(dispatch)=>{
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const {data} = await axios.put('http://localhost:5000/UpdateProfile',
        myForm,
        {
            headers:{"Content-Type":"multipart/form-data"},
            withCredentials: true,
            httpOnly:true
        }
        )

        dispatch({
            type:USER_UPDATE_SUCCESS,
            payload:data.sucess
        })
        
    } catch (error) {
        dispatch({
            type:USER_UPDATE_FAIL
        })
    }
}
export const updatePassword = (password) => async(dispatch)=>{
    try {
        dispatch({
            type: CHANGE_PASSWORD_REQUEST
        })

        const {data} = await axios.put('http://localhost:5000/UpdatePassword',
        password,
        {
            headers:{"Content-Type":"application/json"},
            withCredentials: true,
        }
        )

        dispatch({
            type:CHANGE_PASSWORD_SUCCESS,
            payload:data.sucess
        })
        
    } catch (error) {
        dispatch({
            type:CHANGE_PASSWORD_FAIL
        })
    }
}
export const ForgotPassword = (passwords) => async(dispatch)=>{
    try {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        })

        const {data} = await axios.post('http://localhost:5000/password/forgot',
        passwords,
        {
            headers:{"Content-Type":"application/json"},
            withCredentials: true,
            httpOnly:true
        }
        )
        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            payload:data.Message
        })
        
    } catch (error) {
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload:error.data.message
        })
    }
}
export const resetPassword = (token, passwords) => async(dispatch)=>{
    try {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        })

        const {data} = await axios.put(`http://localhost:5000/password/reset/${token}`,
        passwords,
        {
            headers:{"Content-Type":"application/json"},
            withCredentials: true,
            httpOnly:true
        }
        )
        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            payload:data.Message
        })
        
    } catch (error) {
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload:error.data.message
        })
    }
}


export const AllAdminUsers = ()=>async(dispatch)=>{
    try {
        const config = {
            headers:{
                "Content-Type":"application/json",
                credentials:'include'
            },
        withCredentials: true,      
        }
    dispatch({
        type:ALL_ADMIN_USER_REQUEST
    })     
     const {data} =  await axios.get('http://localhost:5000/getAllusers',
     config
     )

    dispatch({
        type:ALL_ADMIN_USER_SUCCESS,
        payload: data.users
    })

    } catch (error) {
        dispatch({
            type:ALL_ADMIN_USER_FAIL,
            payload: error.response 
        })
    }
}
export const GETAdminUser = (id)=>async(dispatch)=>{
    try {
        const config = {
            headers:{
                "Content-Type":"application/json",
                credentials:'include'
            },
        withCredentials: true,      
        }
    dispatch({
        type:GET_ADMIN_USER_REQUEST
    })     
     const {data} =  await axios.get(`http://localhost:5000/getUser/${id}`,
     config
     )

    dispatch({
        type:GET_ADMIN_USER_SUCCESS,
        payload: data.user
    })

    } catch (error) {
        dispatch({
            type:GET_ADMIN_USER_FAIL,
            payload: error.response 
        })
    }
}
export const UpdateUserAdmin = (id,userData)=>async(dispatch)=>{
    try {
        const config = {
            headers:{
                "Content-Type":"application/json",
                credentials:'include'
            },
        withCredentials: true,      
        }

    dispatch({
        type:UPDATE_ADMIN_USER_REQUEST
    })     
     const {data} =  await axios.put(`http://localhost:5000/getUser/${id}`,
     userData,
     config
     )

    dispatch({
        type:UPDATE_ADMIN_USER_SUCCESS,
        payload: data.sucess
    })

    } catch (error) {
        dispatch({
            type:UPDATE_ADMIN_USER_FAIL,
            payload: error.response 
        })
    }
}
export const DeleteUserAdmin = (id)=>async(dispatch)=>{
    try {
    dispatch({
        type:DELETE_ADMIN_USER_REQUEST
    })     
     const {data} =  await axios.delete(`http://localhost:5000/getUser/${id}`,
     config
     )

    dispatch({
        type:DELETE_ADMIN_USER_SUCCESS,
        payload: data.success
    })

    } catch (error) {
        dispatch({
            type:DELETE_ADMIN_USER_FAIL,
            payload: error.response 
        })
    }
}