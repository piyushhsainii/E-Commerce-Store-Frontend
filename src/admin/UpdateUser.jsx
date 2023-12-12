import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from './sidebar'
import { Button, Typography } from '@mui/core'
import { useSelector , useDispatch } from 'react-redux'
import { AccountTree, AttachMoney, Category, ChromeReaderModeSharp, Description, Email, FormatIndentDecreaseOutlined, MergeType, Spellcheck, Storage, SupervisedUserCircle } from '@mui/icons'
import { useAlert } from 'react-alert'
import { NEW_PRODUCT_RESET } from '../constants/productConstans'
import { AddNewProduct, clearErrors } from '../actions/productAction'
import { CgNametag } from 'react-icons/cg'
import { GETAdminUser, UpdateUserAdmin } from '../actions/userAction'
import Loader from '../../Loader'
import { UPDATE_ADMIN_USER_RESET } from '../constants/userConstants'

const UpdateUser = ({history,match}) => {
    const alert = useAlert()
    const dispatch = useDispatch()


        const { loading, isUpdated, error: updaterror} = useSelector((state)=>state.updateProfile)
        const { loading:userloading , error, user } = useSelector((state) => state.GetSingleUser);

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [role, setRole] = useState('')


    const userId = match.params.id;

    useEffect(()=>{
            // dispatch(GETAdminUser(userId))
            const fetchData = async () => {
                try {
                    // Fetch user data only if user is not available or user ID doesn't match
                    if (!user || user._id !== userId) {
                         dispatch(GETAdminUser(userId));
                    } else {
                        setname(user.name);
                        setemail(user.email);
                        setRole(user.role);
                    }
                } catch (error) {
                    alert.error("Error fetching user data");
                }
            };
            fetchData();
          if (error) {
            alert.error(error);
            dispatch(clearErrors()); 
          }

        if(updaterror){
            alert.error(updaterror)
            dispatch(clearErrors()); 
        }
        if(isUpdated){
            alert.success("User Role Updated Successfully")
            history.push('/admin/users')
            dispatch({
                type:UPDATE_ADMIN_USER_RESET
            })
        }



    },[dispatch, alert, updaterror, error, history,isUpdated,user,userId])

    const createSubmitHandler = (e)=>{
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("name",name)
        myForm.set("email",email)
        myForm.set("role",role)

        dispatch(UpdateUserAdmin(userId,myForm)) 
    }



  return (
<Fragment>
        <div className='sidebar-container'>
        <Sidebar/>
    <div className='create-product-container'  >
        <Typography style={{fontSize:"2.4vmax" , color:"tomato", margin:"2vmax" }} > UPDATE USER </Typography>
    {
    userloading ? 
    <Loader/> 
    :(
        <form onSubmit={createSubmitHandler}>
            <div className='create-container' >
            <MergeType  className='create-svg' />
            <input type="text"
            placeholder='Name'
            value={name}
            onChange={(e)=>setname(e.target.value)}
            required
            />

            </div>
            <div className='create-container' >
            <Email  className='create-svg'/>
            <input 
            placeholder='Email'
            required
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            />
            </div>       

            <div className='create-container' >
            <SupervisedUserCircle  className='create-svg' />
            <select onChange={(E)=> setRole(E.target.value)} required >
                <option >Select Role</option>
                <option name="" id="">admin</option>
                <option name="" id="">role</option>
            </select>
                </div>

                
                <Button className='create-product-btn'
                type='submit'
                disabled ={ loading ? true : false}
                >
                    UPDATE
                </Button>
        </form>
    ) } 
    </div>
    </div>
    
  </Fragment>
  )
}

export default UpdateUser 