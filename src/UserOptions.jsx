import React, { useState } from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PFP from './assets/user.png'
import { Dashboard , Person , ExitToApp , ListAlt, ShoppingCart } from '@material-ui/icons'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import './Header.css'
import { useAlert } from 'react-alert'
import { logout } from './actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import {Backdrop} from '@material-ui/core'
const UserOptions = ({user}) => { 
  const [ open, setOpen] = useState(false)
  
  const { cartItems } = useSelector((state)=> state.cart)

  const alert = useAlert()
  const history = useHistory()
  const dispatch = useDispatch()

  const account = ()=>{
    history.push('/profile')
  }

  const List = ()=>{
    history.push('/MyOrders')
  }
  const Cart = ()=>{
    history.push('/Cart')
  }

  const Logout = ()=>{
    history.push('/')
    alert.success("Logged Out Successfully")
    dispatch(logout())
    
  }

  const dashBoard = ()=>{
    history.push('/admin/dashboard')
  }
  const options = [
    {icon: <Person/> , name:"Profile" , func: account},
    {icon: <ListAlt /> , name:"Orders", func:List },
    {icon: <ShoppingCart style={{color:cartItems.length>0?"tomato":"unset"}} /> , name:"Cart", func:Cart },
    { icon: <ExitToApp/>, name:"Logout", func: Logout  }
  ]
  if(user.role==="admin"){
    options.unshift({
      icon: <Dashboard/>,
       name:"Dashboard",
       func:dashBoard 
      });
  }
  return ( 
    <div className='speed-dial' >
      <Backdrop
      open={open}
      // style={{zIndex:"-10"}}
       />
      <SpeedDial
      style={{ zIndex: "999999" }}
      ariaLabel='SpeedDial'
      onMouseLeave={()=> setOpen(false)}
      onMouseEnter={()=> setOpen(true)}
      open ={open}
      direction="down"
      icon={
        <img
        className='speed-dial-icon'
        src={user.avatar[0].url ? user.avatar[0].url : PFP}
        />
      }
      >  
      {options.map((item)=>(
              <SpeedDialAction
              key={item.name}
              icon={item.icon }
              tooltipTitle={item.name}
              onClick={item.func}
              />
      ))}
      </SpeedDial>
    </div>
  )
}

export default UserOptions