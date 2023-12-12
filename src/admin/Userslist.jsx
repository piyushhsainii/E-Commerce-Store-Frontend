import React, { Fragment, useEffect } from 'react';
import  { DataGrid }  from '@mui/x-data-grid';
import {useDispatch, useSelector} from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import Sidebar from "./sidebar"
import Loader from '../../Loader'
import  { deleteProducts, getAdminProducts } from '../actions/productAction'
import { Button } from "@mui/material";
import "./ProductList.css"
import { AllAdminUsers, DeleteUserAdmin } from '../actions/userAction';
import { DELETE_ADMIN_USER_RESET } from '../constants/userConstants';

const UserLists = ({history}) => {

    const dispatch = useDispatch()
    const alert = useAlert();
    const  {  loading,user, error } = useSelector((state)=>state.AllUsers)
    const {
      error: delerror,
      isUpdated,
    } = useSelector((state) => state.updateProfile);

  const deleteUserHandler = (id)=>{
      dispatch(DeleteUserAdmin(id))
  }
    useEffect(() => {

        if(error){
            alert.error(error)
        }
        if(delerror){
            alert.error(delerror)
        }

        if(isUpdated){
          alert.success("User Deleted Successfully")
          dispatch({
            type:DELETE_ADMIN_USER_RESET
          })
        }

      dispatch(AllAdminUsers())
    }, [dispatch,alert,error,delerror,isUpdated, history])
    
    const columns = [
      {field:"id",
      headerName:"USER ID",
      minWidth:200,
      flex:0.4
      },
      {field:"email",
      headerName:"Email",
      minWidth:200,
      flex:0.4
      },
      {field:"name",
      headerName:"Name",
      minWidth:200,
      flex:0.3
      },
      {field:"role",
      headerName:"Role",
      type:"Number",
      minWidth:200,
      flex:0.3,
      cellClassName:(params)=>{
        return (
            params.getValue(params.id,"role") === "admin" ? "greenColor" : "redColor "
            )
        

      }
    },
      {
      field:"actions",
      headerName:"Actions",
      type:"Number",
      minWidth:150,
      flex:0.3,
      sortable:false,
      renderCell:(params)=>{
          return (
              <Fragment> 
                  <div className='admin-icon-container' >
                  <Link to={`/admin/user/${params.getValue(params.id,"id")}`} >
                      <Edit className='editicon' />
                  </Link>
                  <Button onClick={()=> deleteUserHandler(params.getValue(params.id, "id"))} >
                      <Delete/>
                  </Button>
                      </div>                
                
              </Fragment>
                  )

      }
      },
  ]
  const rows = [];
  
    { user &&
      user.forEach((item) => {
        rows.push({
          id: item._id,
          email: item.email,
          name: item.name,
          role: item.role,
        });
      });}    

  return (
    <Fragment>
       {loading? 
       <Loader/>
       : 
       <div className='sidebar-container' >
       <Sidebar/>
   <div>
   <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
         </div>
   </div>
    }
    </Fragment>
    )
}

export default UserLists