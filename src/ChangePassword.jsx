import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_PASSWORD_RESET } from './constants/userConstants'
import Loader from '../Loader'
import { LockOpen, VpnKey, VpnKeyRounded } from '@mui/icons-material'
import "./changepassword.css"
import { updatePassword, updateProfile } from './actions/userAction'
import MetaData from './MetaData'

const ChangePassword = ({history}) => {

    const dispatch = useDispatch()
    const alert = useAlert()
    
    const { user} = useSelector((state)=>state.user)


    const { loading, isUpdated, error} = useSelector((state)=>state.updateProfile)

    const [password, setpassword] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")


  const updateProfileSubmit = (e)=>{
      e.preventDefault();
      const myForm = new FormData()
      myForm.set("password",password)
      myForm.set("newPassword",newPassword)
      myForm.set("confirmPassword",confirmPassword)
      dispatch(updatePassword(myForm))
  }


  //useEffects

  useEffect(()=>{
      if(error){
          dispatch(clearErrors())
          alert.error(error.data.message)
      }

      if(isUpdated){
        alert.success("Password Updated Successfully")
        history.push('/profile')
      }

      dispatch({
        type: CHANGE_PASSWORD_RESET,
      });

  },[dispatch , error, history , user , isUpdated  ])

  return (
    <>
    {loading ? <Loader/> : 
    (
        <> 
        <MetaData title={"Change Password"} ></MetaData>

        <div className='changePassword' id='topelement' >
        <p className='text CHANGEPASSWORD'> CHANGE PASSWORD </p>
            <VpnKey  style={{ fontSize: '1.3vmax', color:"grey",  }} className='iconspassword'  />
             <input
             type="password"
             placeholder='enter old password'
             required={true}
             value={password}
             onChange={(e)=>setpassword(e.target.value)}
             />
            </div>
        <div className='changePassword' >
            <LockOpen style={{ fontSize: '1.3vmax', color:"grey",  }} className='iconspassword' />
             <input
             type="password"
             placeholder='enter new password'
             required={true}
             value={newPassword}
             onChange={(e)=>setnewPassword(e.target.value)}
             />
            </div>
        <div className='changePassword'  >
            <LockOpen style={{ fontSize: '1.3vmax', color:"grey",  }} className='iconspassword' />
             <input
             type="password"
             placeholder='confirm password'
             required={true}
             value={confirmPassword}
             onChange={(e)=>setconfirmPassword(e.target.value)}
             />
            </div>
            <div className='changebutton' id='lastelement'>
            <input
             type="button"
             value= "CHANGE PASSWORD"
             onClick={updateProfileSubmit}
             />
            </div>
 
        </>
    )
    }
    </>

  )
}

export default ChangePassword