import { createStore, combineReducers, applyMiddleware} from 'redux'

import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productReducer,productDetailsReducer, AddReview, AddProduct, DeleteProduct, updateProduct, AllReviews, UpdateAllReviews} from './reducrs/productReducer.jsx';
import {UserReducers, RegisterUser, updateProfile, ForgotProfile, ALLUSERSADMINS, GETSINGLEUSER } from './reducrs/userReducer.jsx';
import { cartReducer} from "./reducrs/cartReducer.jsx"
import { AllOrders, EditOrders, MyOrder, OrderReducer } from './reducrs/orderReducer.jsx';

const reducer = combineReducers({
    products : productReducer,
    productDetails : productDetailsReducer,
    user : UserReducers,
    Register : RegisterUser,
    updateProfile : updateProfile,
    ForgotUser : ForgotProfile,
    cart : cartReducer,
    newOrder : OrderReducer,
    MyOrder : MyOrder,
    newReview: AddReview,
    createProduct: AddProduct,
    deleteProduct : DeleteProduct,
    updateProduct : updateProduct,
    AllOrders: AllOrders,
    EditOrders:  EditOrders,
    AllUsers :ALLUSERSADMINS,
    GetSingleUser : GETSINGLEUSER,
    AllReviews : AllReviews,
    UpdateReviews :UpdateAllReviews,

})

let initialState = {
        cart :{
            cartItems: localStorage.getItem("cartItems")?
             JSON.parse(localStorage.getItem("cartItems")):
             [],
             shippingInfo: localStorage.getItem("shippingInfo")?
              JSON.parse(localStorage.getItem("shippingInfo")):
              []      
        },

};
const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools( applyMiddleware(...middleware))
    )

    export default store;