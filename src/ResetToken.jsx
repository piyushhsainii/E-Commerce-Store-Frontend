import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import { useDispatch, useSelector } from 'react-redux'
import { MailOutline } from '@mui/icons-material'
import "./resetToken.css"
import { ForgotPassword } from './actions/userAction'
import { useAlert } from 'react-alert'

const ResetToken = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading ,message } = useSelector((state)=> state.ForgotUser)
    const [Email, setEmail] = useState("")

    const updateProfileSubmit = (e)=>{
        e.preventDefault();
        const myForm = new FormData()
        myForm.set("email",Email)
        dispatch(ForgotPassword(myForm))
    }
    
    useEffect((error)=>{
        if(error){
            dispatch(clearErrors())
            alert.error(error.data.message)
        }
        if(message)
        alert.success(message)
    },[loading, dispatch])

  return (
    <>
    {loading ? <Loader /> :
   <> 
    <form
    className='reset-container'
    onSubmit={updateProfileSubmit}
    >
    <div className='reset-email' >
    <MailOutline  style={{ fontSize: '1.3vmax', color:"grey", paddingRight:"0.5vmax" }}  />
    <input
    type='email'
    placeholder='enter email'
    required={true}
    name='email'
    value={Email}
    onChange={(e)=>setEmail(e.target.value)}
    />
    </div>
        <input 
        type="submit" 
        value="Reset Password"
        className='signUpBtn text '
        disabled = { loading? true : false}
        />
    </form>
   </>
}
    </>
  )
  }
export default ResetToken