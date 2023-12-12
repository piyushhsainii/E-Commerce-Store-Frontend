import React, { Fragment, useEffect } from 'react';
import  {DataGrid}  from '@mui/x-data-grid';
import {useDispatch, useSelector} from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import Sidebar from "./sidebar"
import Loader from '../../Loader'
import  { deleteProducts, getAdminProducts } from '../actions/productAction'
import { Button } from "@mui/material";
import "./ProductList.css"
import { PRODUCT_DELETE_RESET } from '../constants/productConstans';

const AllProducts = ({history}) => {

    const dispatch = useDispatch()
    const alert = useAlert();
    const  { error, loading, products } = useSelector((state)=>state.products)
    const  { error:delerror, isDeleted } = useSelector((state)=>state.deleteProduct)

  const deleteproducthandler = (id)=>{
      dispatch(deleteProducts(id))
  }

    const columns = [
        {field:"id",
        headerName:"Product ID",
        minWidth:200,
        flex:0.3
        },
        {field:"name",
        headerName:"Name",
        minWidth:200,
        flex:0.3
        },
        {field:"stock",
        headerName:"Stock",
        type:"Number",
        minWidth:200,
        flex:0.3
        },
        {field:"price",
        headerName:"Price",
        minWidth:200,
        flex:0.3
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
                    <Link to={`/admin/product/${params.getValue(params.id,"id")}`} >
                        <Edit className='editicon' />
                    </Link>
                    <Button
                    style={{cursor:"pointer"}}
                    onClick={()=> deleteproducthandler(params.getValue(params.id, "id"))} >
                        <Delete/>
                    </Button>
                        </div>                
                  
                </Fragment>
                    )

        }
        },
    ]

    const rows = [];

    products &&
      products.forEach((item) => {
        rows.push({
          id: item._id,
          stock: item.Stock,
          price: item.price,
          name: item.name,
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
            type:PRODUCT_DELETE_RESET
          })
        }

      dispatch(getAdminProducts())
    }, [dispatch,alert,error,delerror,isDeleted, history])
    
    {products && products.forEach((item)=> {
            rows.push({
            id:item._id,
            name:item.name,
            stock:item.Stock,
            price:item.price,
           }
           )
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

export default AllProducts