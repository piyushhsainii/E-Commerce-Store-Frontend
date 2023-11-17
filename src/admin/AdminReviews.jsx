import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from "./sidebar"
import { Button, Typography } from '@material-ui/core'
import  DataGrid  from '@material-ui/data-grid'
import { getAllReviews ,deleteAllReviews } from '../actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import { Delete, Search } from '@material-ui/icons'
import "./review.css"
import { useAlert } from 'react-alert'
import { DELETE_REVIEWS_RESET } from '../constants/userConstants'

const AdminReviews = () => {

    const { loading, reviews ,error } = useSelector((state)=>state.AllReviews)
    const { error:UPDATEERROR, isUpdated } = useSelector((state)=>state.updateProfile)
    const alert = useAlert()
    const dispatch = useDispatch()
    const [productId, setproductId] = useState('')

    const deleteReviewHandler = (id)=>{
        dispatch(deleteAllReviews(id,productId ) )

    }

    const columns = [
        {
            field:"id",
            headerName:"REVIEW ID",
            minWidth:250,
            flex:0.4
      
          },{
            field:"User",
            headerName:"User",
            minWidth:250,
            flex:0.3,
            
          },{
            field:"Comment",
            headerName:"Comment",
            minWidth:150,
            flex:0.3,
            type:"Number"
      
          }
          ,{
            field:"Rating",
            headerName:"Rating",
            minWidth:150,
            flex:0.3,
            type:"Number",
            cellClassName:(params)=>{
                return (
                  params.getValue(params.id, "Rating") >= 3 ?  "greenColor" :"redColor"
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
                    <Button 
                    onClick={()=> deleteReviewHandler(params.getValue(params.id, "id"))} >
                        <Delete />
                    </Button >
                        </div>                
                </Fragment>
                    )

        }
        },
    ]

    const rows = [];

    
      reviews &&  reviews.forEach((item)=>(
            rows.push({
                id:item._id,
                User:item.user,
                Comment:item.comment,
                Rating: item.rating
            })
        ))
    


    const reviewfetchHandler = (e)=>{
        e.preventDefault()
        dispatch(getAllReviews(productId))
    }

    useEffect(()=>{
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
          }

        if(error){
            alert.error(error)
        }

        if(UPDATEERROR){
            alert.error(error)
        }
        if(isUpdated){
            alert.success("Review Deleted successfully")
            dispatch({
                type:DELETE_REVIEWS_RESET
            })
        }


    },[dispatch, productId, alert, error,isUpdated, productId ])

  return (
    <Fragment>
        <div className='sidebar-container' >
        <Sidebar/>
        <div  >
            <div className='review-container2'>
            <Typography
            style={{fontSize:"2vmax"}}
            >REVIEWS</Typography>
            <form
             onSubmit={reviewfetchHandler}
             className='review-form'
             >
                <Search
                style={{alignItems:"center", position:"relative",top:"7px"}}
                /> <input 
                type="text" 
                placeholder='Enter Product ID'
                onChange={(e)=>setproductId(e.target.value)}  
                /> <br></br>
                <Button
                disabled= {productId === 24 ? false  : true}
                className='search-btn'
                type='submit'     
                >
                    Search
                </Button>
            </form>
                    </div>
            <div>
            {
                reviews && reviews.length > 0 ? 
                (
                    <>
            <DataGrid
            style={{zIndex:"0"}}
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
                    </>
                ) : (
                    <div className='review-container2' >
                        <Typography>
                            No Reviews Found
                        </Typography>
                    </div>
                )
            }

            </div>
        </div>
        </div>
    </Fragment>
    )
}

export default AdminReviews