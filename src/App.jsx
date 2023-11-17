import { BrowserRouter as Router ,Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Home from './Home.jsx'
import Loader from '../Loader.jsx'
import ProductDetails from './ProductDetails.jsx'
import Products from './Products.jsx'
import Search from './Search.jsx'
import Login from './Login.jsx'
import Profile from './Profile.jsx'
import {useDispatch , useSelector } from 'react-redux'
import { loadUser } from './actions/userAction.jsx'
import { useEffect, useState } from 'react'
import UserOptions from './UserOptions.jsx'
import store from "./store";
import EditProfile from "./EditProfile.jsx"
import ProtectedRoute from "./Route/ProtectedRoute.jsx"
import ChangePassword from "./ChangePassword.jsx"
import ResetToken from "./ResetToken.jsx"
import ForgotPasswordComponent from './ResetPassword.jsx'
import Cart from "../Cart/cart.jsx"
import ShippingInfo from '../Cart/ShippingInfo.jsx'
import OrderConfirm from '../Cart/OrderConfirm.jsx'
import axios from 'axios'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import Order from '../Cart/Order.jsx'
import Failed from '../Cart/Failed.jsx'
import MyOrders from '../Cart/MyOrder.jsx'
import { getOrders } from './actions/OrderAction.jsx'
import OrderDetails from './Cart/OrderDetails.jsx'
import { useAlert } from 'react-alert'
import Dashboard from './admin/Dashboard.jsx'
import AllProducts from './admin/AllProducts.jsx'
import createProduct from './admin/createProduct.jsx'
import { productReducer } from './reducrs/productReducer.jsx'
import UpdateProduct from './admin/UpdateProduct.jsx'
import AdminOrders from './admin/AdminOrders.jsx'
import EditOrder from './admin/EditOrder.jsx'
import actionProduct from './actions/productAction.jsx'
import UserLists from './admin/Userslist.jsx'
import UpdateUser from './admin/UpdateUser.jsx'
import AdminReviews from './admin/AdminReviews.jsx'
import AboutMe from './AboutMe.jsx'
import Contact from './Contact.jsx'
import NotFound from './NotFound/NotFound.jsx'

function App() {
  const alert = useAlert()
  const {loading, isAuthenticated ,user } = useSelector((state)=> state.user)
  const dispatch = useDispatch()
   const [stripeKey, setstripeKey] = useState("")
  async function getStripekey(){
    const config = {
      headers:{ 
          "Content-Type":"application/json",
          credentials:'include'
      },
    withCredentials: true,      
  }
    const {data} =  await axios.get(' https://e-commerce-my-store.onrender.com/payment/stripeKey',
    config
    )
    setstripeKey(data.stripe_key)
  } 
 
  useEffect((error)=>{

    if(error){
      alert.error(error)
    }

    dispatch(loadUser());
    dispatch(actionProduct())
    dispatch(getOrders())
    getStripekey();
  },[])
  
  
  return ( 
    <>
    <Router>
    <Header />
    <Switch>
    {/* {isAuthenticated && <UserOptions user={user}/> } */}
    <Route exact path='/' component={Home} /> 
    <Route  exact path='/product/:id' component={ProductDetails } /> 
    <Route  exact path='/products' component={Products } /> 
    <Route  path='/products/:keyword' component={Products } /> 
    <Route  exact path='/Search' component={Search } /> 
    <ProtectedRoute exact path='/Profile' component={Profile }  />
    <ProtectedRoute exact path='/update-profile' component={EditProfile } />  
    <ProtectedRoute exact path='/password/update' component={ChangePassword } />  
    <Route exact path='/password/forgot' component={ResetToken } />  
    <Route path='/password/forgot/:token' component={ForgotPasswordComponent } />  
    <Route  exact path='/Login' component={Login } /> 
    <Route  exact path='/Cart' component={Cart } /> 
    <ProtectedRoute exact path='/Shipping' component={ShippingInfo } />  
    <ProtectedRoute exact path='/success' component={Order } />  
    <ProtectedRoute exact path='/successa' component={Failed } />  
    <ProtectedRoute exact path='/MyOrders' component = {MyOrders} />
    <ProtectedRoute exact path='/about' component = {AboutMe} />
    {/* <Switch> */}
    <ProtectedRoute exact path='/order/confirm' component={OrderConfirm } />  
    <ProtectedRoute exact path='/order/:id' component = {OrderDetails} />
    {/* </Switch> */}

    <ProtectedRoute exact path='/contact' component = {Contact} />
    <ProtectedRoute isAdmin={true} exact path='/admin/dashboard' component = {Dashboard} />
    <ProtectedRoute isAdmin={true} exact path='/admin/products' component = {AllProducts} />
    <ProtectedRoute isAdmin={true} exact path='/admin/product' component = {createProduct} />
    <ProtectedRoute isAdmin={true} exact path='/admin/product/:id' component = {UpdateProduct} />
    <ProtectedRoute isAdmin={true} exact path='/admin/orders' component = {AdminOrders} />
    <ProtectedRoute isAdmin={true} exact path='/admin/order/:id' component = {EditOrder} />
    <ProtectedRoute isAdmin={true} exact path='/admin/users' component = {UserLists} />
    <ProtectedRoute isAdmin={true} exact path='/admin/user/:id' component = {UpdateUser} />
    <ProtectedRoute isAdmin={true} exact path='/admin/reviews' component = {AdminReviews} />
    <Route component={NotFound} />
    <ProtectedRoute component={NotFound} />
    </Switch>
    {isAuthenticated && <UserOptions user={user}/> }
    <Footer/>
    </Router>
    </>
  )
}
 
export default App
