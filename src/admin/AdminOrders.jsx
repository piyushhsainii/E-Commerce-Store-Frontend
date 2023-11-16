import React, { Fragment, useEffect, useState } from 'react'
import { AllOrders, deleteOrders } from '../actions/OrderAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Sidebar from './sidebar';
import { DataGrid } from '@material-ui/data-grid';
import Loader from '../../Loader';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Delete, Edit } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { DELETE_ORDER_RESET } from '../constants/OrderConstants';

const AdminOrders = ({history}) => {

    const dispatch = useDispatch()
    const alert = useAlert();
    const  { error, loading, products } = useSelector((state)=>state.products)
    // const  { error:delerror, isDeleted } = useSelector((state)=>state.deleteProduct)
    const { MyOrders } = useSelector((state)=>state.AllOrders)
    const { isDeleted, error:delerror } = useSelector((state)=>state.EditOrders)


  const deleteOrderhandler = (id)=>{
      dispatch(deleteOrders(id))
  }

    const columns = [
        {
            field:"id",
            headerName:"ORDER ID",
            minWidth:250,
            flex:0.4
      
          },{
            field:"status",
            headerName:"Status",
            minWidth:250,
            flex:0.3,
            cellClassName:(params)=>{
              return (
                params.getValue(params.id, "status") === "Delivered" ? "greenColor" :"redColor"
              )
            }
          },{
            field:"itemsQty",
            headerName:"Quantity",
            minWidth:150,
            flex:0.3,
            type:"Number"
      
          }
          ,{
            field:"Amount",
            headerName:"Amount",
            minWidth:150,
            flex:0.3,
            type:"Number"
      
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
                    <Link to={`/admin/order/${params.getValue(params.id,"id")}`} >
                        <Edit className='editicon' />
                    </Link>
                    <Button onClick={()=> deleteOrderhandler(params.getValue(params.id, "id"))} >
                        <Delete/>
                    </Button >
                        </div>                
                  
                </Fragment>
                    )

        }
        },
    ]

    const rows = [];

    MyOrders &&
      MyOrders.forEach((item) => {
        rows.push({
          id: item._id,
          itemsQty: item.orderItems[0].quantity,
          Amount: item.Totalprice,
          status: item.orderStatus,
        });
      });

    useEffect(() => {

        if(error){
            alert.error(error)
        }
        if(delerror){
            alert.error(delerror)
        }

        if(isDeleted){
          alert.success("Product Deleted Successfully")
          dispatch({
            type:DELETE_ORDER_RESET
          })
        }

      dispatch(AllOrders())
    }, [dispatch,alert,error,delerror,isDeleted, history])
    
    // {products && products.forEach((item)=> {
    //         rows.push({
    //         id:item._id,
    //         name:item.name,
    //         stock:item.Stock,
    //         price:item.price,
    //        }
    //        )
    // });}

  return (
    <Fragment>
       {loading? 
       <Loader/>
       : 
       <div className='sidebar-container' >
       <Sidebar/>
   <div>
   <DataGrid
            style={{zIndex:"0"}}
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

export default AdminOrders