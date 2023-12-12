import React, { Fragment, useEffect } from 'react'
import Sidebar from './sidebar.jsx'
import "./dashboard.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.js'
import { Typography } from '@mui/material'
import { Doughnut, Line } from 'react-chartjs-2'
import { 
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Legend,
    LineElement,
    Tooltip,
    BarElement,
    PointElement,
    ArcElement
 } from 'chart.js'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../actions/productAction.jsx'
import { AllOrders } from '../actions/OrderAction.jsx'
import { AllAdminUsers } from '../actions/userAction.jsx'
import Loader from '../../Loader.jsx'
 
const Dashboard = () => {

    const dispatch = useDispatch()
    const  {  products } = useSelector((state)=>state.products)
    const {loading, MyOrders } = useSelector((state)=>state.AllOrders)
    const { user } = useSelector((state)=>state.AllUsers)
    let OutofStock = 0

    {products && products.forEach(item => {
        if(item.Stock === 0 || item.Stock < 0 ){
            OutofStock += 1
        }
    });}

    let totalAmount = 0;
    MyOrders && MyOrders.forEach(item=>(
        totalAmount += parseFloat(item.Totalprice)
        ))


    ChartJS.register(
        LineElement,
        Tooltip,
        Legend,
        CategoryScale,
        LinearScale,
        PointElement,
        ArcElement
    )

    const lineData= {
        labels:["Initial Amount", "Amount Earned"],
        datasets:[
            {
                label:"TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor:['rgb(197,72,49)'],
                data:[0,4000],
            },
        ],
    }

    const donutData={
        labels:["OutofStock", "InStock"],
        datasets:[
           {
             label:"STOCK",
             backgroundColor:["tomato", "rgb(197,72,49)"],
             
             data:[OutofStock,products.length-OutofStock]
            }
        ]
    }

    useEffect(() => {
        dispatch(AllOrders())
        dispatch(AllAdminUsers())
        dispatch(getAdminProducts())
      }, [dispatch])

  return (
    <Fragment>
        {loading? 
        <Loader/>
            : 
            (
                <div className='sidebar-container' >
        <Sidebar />
        <div className='sidebar-container1-0' >
            <Typography style={{fontSize:"2vmax", padding:"1vmax"}} component={'h1'} >Dashboard</Typography>
            <div className='sidebar-container1-1'>
            <p>
            Total Amount  <br/> ₹{totalAmount}
            </p>
        </div>
        <div className='sidebar-container1-2' >
            <Link to="/admin/products">
             <p>Products</p>
             <p style={{textAlign:"center"}}>{products.length}</p>
            </Link>
            <Link to="/admin/orders">
             <p>Orders</p>
             <p style={{textAlign:"center"}}>{MyOrders.length}</p>
            </Link>
            <Link to="/admin/users">
             <p>Users</p>
             <p style={{textAlign:"center"}}>{user.length}</p>
            </Link>
        </div>
        <div className='lineChart' >
         <Line data = {lineData}/>
        </div>
        <div className='doughnutChart' >
         <Doughnut data={donutData} />
        </div>

        </div>


    </div>
            )
    }
    </Fragment>
  )
}

export default Dashboard