import React, { useEffect, useRef, useState } from 'react'
import { MailOutline } from '@mui/icons-material'
import { LockOpen } from '@mui/icons-material'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { Face } from '@mui/icons-material'
import PFP from './assets/user.png'
import profilepic from '../public/user.png'
import { useSelector, useDispatch }  from 'react-redux'
import './Login.css'
import {
    userAction,
    registerUser,
    clearErrors,
    loadUser,
  }  from './actions/userAction'
import { useAlert } from 'react-alert'
import Loader from '../Loader'
import MetaData from './MetaData' 


const Login = ( {history} ) => {

//middlewares
const dispatch = useDispatch()
const alert = useAlert()
const { loading, error ,isAuthenticated } = useSelector((state)=>state.user)

    //React States 
    const [ loginEmail,setLoginEmail] = useState("")
    const [loginPassword,setLoginPassword] = useState("")
    const [ user, setUser] = useState({
        name:"",
        email:"",
        password:""
    })
    const { name, email,password} = user
    const [avatar, setAvatar] = useState('/user.png')
    const [avatarPreview, setAvatarPreview] = useState(PFP)


//useRef
    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

// switchTab function functionality
    const switchTabs = (e, tab) =>{
        if(tab==="Login"){ 
            switcherTab.current.classList.add("shiftToNeutal")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutalForm")
            loginTab.current.classList.remove("shiftToleft")
        }
        if(tab==="Register"){
            switcherTab.current.classList.remove("shiftToNeutal")
            switcherTab.current.classList.add("shiftToRight")

            registerTab.current.classList.add("shiftToNeutalForm")
            loginTab.current.classList.add("shiftToleft")
        }
    }

    const submitHandler = (e)=>{
        e.preventDefault()
         try {
            dispatch(userAction(loginEmail,loginPassword))
            history.push('/profile')
           
         } catch (error) {
            alert.error(error)
         }
    }

    
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setAvatarPreview(reader.result);
                        setAvatar(reader.result);
                    }
                };
                reader.readAsDataURL(selectedFile);
            }
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };
    

    const registerSubmit = (e)=>{
        e.preventDefault();
        const myForm = new FormData()
        myForm.set("name",name)
        myForm.set("email",email)
        myForm.set("password",password)
        myForm.set("avatar",avatar)
        dispatch(registerUser(myForm))
        dispatch(loadUser())
    }

    //useEffects
    const redirect = location.search ? location.search.split('=')[1] : '/profile'

    useEffect(()=>{
        if(error){
            alert.error(error.data.message)
            dispatch(clearErrors())
        }


        if(isAuthenticated){
            alert.success("Logged IN Successfully")
            history.push(redirect)
        }
    },[dispatch , isAuthenticated  ,alert ,history ,redirect,error  ])

  return (
    <>
    {loading? <Loader/>
    :
    <>
    <div className='BAAP-CONTAINER'>
        <div className='Form-Container' >
        <div className='LoginSignUpBox' >
            <div>
                <div onClick={(e)=>switchTabs(e, "Login")} >Login      </div>
                <div onClick={(e)=>switchTabs(e, "Register")} >Register</div>
            </div>
            <button className='switcher' ref={switcherTab}> </button>
        </div>  
        <form className='loginform' ref={loginTab} onSubmit={submitHandler}>
            <div className='loginEmail' >
            <MailOutline  style={{ fontSize: '1.3vmax', color:"grey" }}  className='icons1' />
            <input
            type='email'
            placeholder='Email'
            required={true}
            value={loginEmail}
            onChange={(e)=>setLoginEmail(e.target.value)}
            />
            </div>
            <div className='loginPassword' >
            <LockOpen style={{ fontSize: '1.3vmax', color:"grey",  }} className='icons2' />
             <input
             type="password"
             placeholder='Password'
             required={true}
             value={loginPassword}
             onChange={(e)=>setLoginPassword(e.target.value)}
             />
            </div>
            <Link to="password/forgot" value="Login" className="forgetPass" > Forgot Password?  </Link>
            <input type='submit' value="Log In" className='LoginBtn' ></input>
        </form>
        <form
        className='signupBox'
        ref={registerTab}
        encType='multipart/form-data'
        onSubmit={registerSubmit}
        >
        <div className='signupname' > 
        <Face style={{ fontSize: '1.5vmax', color:"grey", paddingRight:"0.5vmax" }}  />
        <input type="text" 
        placeholder='Name'
        name='name'
        value={name}
        onChange={registerDataChange}
        />
        </div>
        <div className='signupEmail' >
        <MailOutline  style={{ fontSize: '1.3vmax', color:"grey", paddingRight:"0.5vmax" }}  />
        <input
        type='email'
        placeholder='Email'
        required={true}
        name='email'
        value={email}
        onChange={registerDataChange}
        />
        </div>
        <div className='loginPassword' id='pfp' >
            <LockOpen style={{ fontSize: '1.4vmax', color:"grey", paddingTop:"2vmax" }} />
             <input
             type="password"
             placeholder='Password'
             name='password'
             required={true}
             value={password}
             onChange={registerDataChange}
             />
            </div>
            <div className='choose-file ' >
            <img src={avatarPreview} className='pfp' alt="avatar" />
            <input
            id='file'
            className='filename visually-hidden  '
             type="file"  
             name='avatar'
             accept='image/*'
             onChange={registerDataChange}
            />
            <label htmlFor="file" className='choose-file-box' > CHOOSE FILE </label>
            </div>
            <input 
            type="submit" 
            value="Register"
            className='signUpBtn'
            disabled = { loading? true : false}
            />
        </form>
    </div>

    </div>
    
    </>

   
    }
    </>
  )
}

export default Login