import React, { Fragment } from 'react'
import logo from '../assets/LOGO2.png'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { Add, Create, Dashboard, ExpandLess, ExpandMore, ListAlt, People, PostAdd, RateReview, ThumbDownAltRounded } from '@mui/icons-material'
import  TreeItem from '@mui/lab/TreeItem'
import  TreeView  from '@mui/lab/TreeView'
import './sidebar.css'


const sidebar = () => {
  return (
    <Fragment>
       <div className='sidebar' >
       <Link to="/" >
        <img src={logo} alt="" className='dashboard-logo' />
        </Link>
        <Link to="/admin/dashboard" >
            <p>
        <Dashboard/> Dashboard
            </p>
        </Link>
        <Link  >
         <TreeView
          defaultExpandIcon={<ExpandMore/>}
          defaultCollapseIcon={<ExpandLess/>} >
            <TreeItem nodeId="1" style={{fontFamily:"sans-serif", fontSize:"2vmax"}} label='Products' >  
            <Link to="/admin/products" >
                <TreeItem nodeId='2' label='all' icon={<PostAdd />} />
            </Link>
            <Link to="/admin/product">
                <TreeItem nodeId='3' label='Create' icon={<Add/>} />
            </Link>
            </TreeItem>
         </TreeView>
        </Link>

        <Link to="/admin/orders" >
            <p>
                <ListAlt/>
                orders
            </p>
       </Link>

        <Link to="/admin/users" >
            <p>
                <People/> Users
            </p>
        </Link>

        <Link to='/admin/reviews' >
        <p>
            <RateReview/>
            Reviews
        </p>
        </Link>

       </div>
    </Fragment>
    )
}

export default sidebar