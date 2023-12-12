import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { LockOpen } from '@mui/icons-material'
import { resetPassword } from './actions/userAction'
import "./ForgetPassword.css"

export const ForgotPasswordComponent = ({match, history}) => {

    const dispatch = useDispatch() 
    const alert = useAlert()
    
    const { user} = useSelector((state)=>state.user)


    const { loading, success, error} = useSelector((state)=>state.ForgotUser)

    const [password, setnewPassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")


  const updateProfileSubmit = (e)=>{
      e.preventDefault();
      const myForm = new FormData()
      myForm.set("password",password)
      myForm.set("confirmpassword",confirmpassword)
      dispatch(resetPassword(match.params.token, myForm))
  }


  //useEffects

  useEffect(()=>{
      if(error){
          dispatch(clearErrors())
          alert.error(error.data.message)
      }
    
      if(success){
        alert.success("Password Updated Sucessfully")
        history.push('/profile')
      }


  },[dispatch , error , user ])

    return (
        <>
        {loading ? <Loader/> : 
        (
            <> 
            <div className='forgetPassword'  id='forget' >
                <LockOpen style={{ fontSize: '1.3vmax', color:"grey",  }} className='iconspassword' />
                 <input
                 type="password"
                 placeholder='set new password'
                 required={true}
                 value={password}
                 onChange={(e)=>setnewPassword(e.target.value)}
                 />
                </div>
            <div className='forgetPassword'  >
                <LockOpen style={{ fontSize: '1.3vmax', color:"grey",  }} className='iconspassword-forget' />
                 <input
                 type="password"
                 placeholder='confirm new password'
                 required={true}
                 value={confirmpassword}
                 onChange={(e)=>setconfirmpassword(e.target.value)}
                 />
                </div>
                <div className='changebutton-forget' id='lastelemente'>
                <input
                 type="button"
                 value= "SET PASSWORD"
                 onClick={updateProfileSubmit}
                 />
                </div>
     
            </>
        )
        }
        </>
    
      )
    }
export default ForgotPasswordComponent