import React, { useEffect } from 'react'
import MetaData from './MetaData'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import "./profile.css"
import PFP from "./assets/user.png"

const Profile = ({history}) => {
    const { loading, isAuthenticated, user} = useSelector((state)=>state.user)

    useEffect(()=>{
        if(isAuthenticated===false){
            history.push('/login')
        }
    },[history, isAuthenticated])

  return (
    <>
    {loading ? 
    <Loader/> :
    <div className='Profile-Container' >
    <div className='profile-1' >
        <MetaData title={`${user.name}'s Profile `} />
        {user.avatar[0].url ? <img src={user.avatar[0].url} /> : <p className='lol' >No Profile Photo</p>}
        <Link className="text edit" to="/update-profile" > Edit Profile </Link>
    </div>
    <div className='profile-2'>
        <h4 className='text' > Full Name </h4>
        <p className='text first' > {user.name} </p>
        <h4 className='text' > Email </h4>
        <p className='text first' > {user.email} </p>
    <div>
        <h4 className='text' >Joined On</h4>
        <p className='text first pad' > {String(user.createdAt).substr(0,10)} </p>
    </div>
    <div>
        <Link className="text link" to="MyOrders" >My Orders</Link>
        <Link className="text link" to="password/update" > Change Password </Link>
      </div>
      <div></div>
    </div>
    </div>
    }
    </>
  )
}

export default Profile