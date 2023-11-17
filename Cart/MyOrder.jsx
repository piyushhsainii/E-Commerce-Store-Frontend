import React, { Fragment, useEffect } from 'react'
import { Link} from 'react-router-dom'
import MetaData from '../src/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { clearErrors, getOrders } from '../src/actions/OrderAction'
import  DataGrid  from "@material-ui/data-grid"
import "./MyOrder.css"
import Loader from '../Loader'
import { Launch } from '@material-ui/icons'
import { Typography } from '@material-ui/core'

const MyOrder = () => {

  const dispatch = useDispatch()
  const alert = useAlert()

  const  { error, loading , user }  = useSelector((state)=>state.user)
  const  { MyOrders }  = useSelector((state)=>state.MyOrder)

  const myOrder = ()=>{
      dispatch(getOrders)
  }

  useEffect(()=>{
    myOrder()
  },[dispatch,loading])

  const columns = [
    {
      field:"id",
      headername:"Id",
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

    },{
      field:"Actions",
      type:"Number",
      minWidth:150,
      flex:0.3,
      headerName:"Actions",
      sortable:false,
      renderCell:(params)=>{
        return (<Link to={`/order/${params.getValue(params.id,"id")}`} >
          <Launch></Launch>
        </Link>)
      }
    }
  ]
  const rows = [
    
  ]

  {
    MyOrders && MyOrders.forEach((item, index) => {
      rows.push({
        itemsQty:item.orderItems[0].quantity,
        id:item._id,
        status:item.orderStatus,
        Amount:item.Totalprice,
      })
    });
  }

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }

  },[])

  
  return (
    <Fragment>
      {
        loading  ? (
          <Loader />
          ) : (
            <div className='baap-of-order' >
            <MetaData title={`${user.name} Orders `} />

            <div className='myOrder-container' >
              <DataGrid
              style={{zIndex:"0"}}
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className='myOrdersTable'
              autoHeight
              />
            </div>
            <Typography className='order-name' >{`${user.name}'s Order `}</Typography>
            </div>  
        )
      }
    </Fragment>
  )
}

export default MyOrder