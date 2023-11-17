import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors , updateProfile } from './actions/userAction'
import { loadUser } from './actions/userAction'
import { USER_UPDATE_RESET } from './constants/userConstants'
import PFP from './assets/user.png'
import { MailOutline } from '@material-ui/icons'
import { LockOpen } from '@material-ui/icons'
import { Face } from '@material-ui/icons'
import MetaData from './MetaData' 
import Loader from '../Loader'
import "./editprofile.css"
import "./Login.css"

const EditProfile = ({history}) => {
    const dispatch = useDispatch()
    const alert = useAlert()
    
    const { user} = useSelector((state)=>state.user)
    const { loading, isUpdated, error} = useSelector((state)=>state.updateProfile)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState(PFP)

    const updateProfileChange = (e) => {
        try {
          const selectedFile = e.target.files[0];
          const reader = new FileReader();
          reader.onload = () => {
              if (reader.readyState === 2) {
                  setAvatarPreview(reader.result);
                  setAvatar(reader.result);
              }
          };
          reader.readAsDataURL(selectedFile);  
        } catch (error) {
          alert.success(error)
        }
  };
  

  const updateProfileSubmit = (e)=>{
      e.preventDefault();
      const myForm = new FormData()
      myForm.set("name",name)
      myForm.set("email",email)
      {avatar?myForm.set("avatar",avatar):""}
      dispatch(updateProfile(myForm))
      alert.success("Profile Updated")
      dispatch(loadUser())
      history.push('/profile')
  }


  //useEffects

  useEffect(()=>{
    setName(user.name)
    setEmail(user.email)
    setAvatarPreview(user.avatar[0].url);
    
      if(error){
          dispatch(clearErrors())
          alert.error(error.data.message)
      }

      if(isUpdated){
        alert.success("Profile Updated Successfully")
        history.push('/profile')
      }

      dispatch({
        type: USER_UPDATE_RESET,
      });

  },[dispatch , error, history , user , isUpdated , user.name ])

  return (
    <>
    <MetaData title="Update Profile" />
    {loading? <Loader/>
    :
    <form
    className='signupBoxer'
    encType='multipart/form-data'
    onSubmit={updateProfileSubmit}
    >
      <div className='text' > EDIT PROFILE </div>
    <div className='signupnamer' > 
    <Face style={{ fontSize: '1.5vmax', color:"grey", paddingRight:"0.5vmax" }}  />
    <input type="text" 
    placeholder='Name'
    name='name'
    value={name}
    onChange={(e)=> setName(e.target.value)}
    />
    </div>
    <div className='signupEmailer' >
    <MailOutline  style={{ fontSize: '1.3vmax', color:"grey", paddingRight:"0.5vmax" }}  />
    <input
    type='email'
    placeholder='Email'
    required={true}
    name='email'
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    />
    </div>
        <div className='choose-filer' >
        <img src={avatarPreview} className='pfp' alt="avatar" />
        <input
        className='filename visually-hidden  '
        id='file'
         type="file"  
         name='avatar'
         accept='image/*'
         onChange={updateProfileChange}
        />
            <label htmlFor="file" onClick={()=>updateProfileChange} className='choose-file-box' > CHOOSE FILE </label>

        </div>
        <input 
        type="submit" 
        value="UPDATE"
        className='signUpBtn text '
        disabled = { loading? true : false}
        />
    </form>

    }

    </> 
  )
}

export default EditProfile