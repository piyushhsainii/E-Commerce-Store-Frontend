import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '../MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import Sidebar from './sidebar';
import './EditOrder.css';
import { useAlert } from 'react-alert';
import Loader from '../../Loader';
import { CLEAR_ERRORS, UPDATE_ORDER_RESET } from '../constants/OrderConstants';
import { AllOrders, getOrders, updateOrders } from '../actions/OrderAction';

const EditOrder = ({ match }) => {
  const { loading, MyOrders } = useSelector((state) => state.AllOrders);
  const {  MyOrders:order } = useSelector((state) => state.MyOrder);
  const { user } = useSelector((state) => state.user);
  const { isUpdated, error } = useSelector((state) => state.EditOrders);

  const [status, setstatus] = useState('')

  const updateOrderStatus = ()=>{ 
    dispatch(updateOrders(match.params.id,myForm))

}

    const myForm = new FormData()

    myForm.set("status",status)

  const dispatch = useDispatch();
  const alert = useAlert();

    useEffect(()=>{

        if(isUpdated){
            alert.success("Order Status has been updated")
            dispatch({
                type:UPDATE_ORDER_RESET
            })
        }
        if(error){
            alert.error(error)
            dispatch({
                type:CLEAR_ERRORS
            })
        }
        dispatch(AllOrders())
    },[isUpdated,error, dispatch,match.params.id])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Update Order Status'}></MetaData>
          <div className="sidebar-container">
            <Sidebar />
            {MyOrders &&
              MyOrders.map((Item) => {
                return Item._id === match.params.id ? (
                  <Fragment key={Item._id}>
                    <div className="order-details-container">
                      <Typography
                        style={{
                          fontSize: '1.9vmax',
                          textAlign: 'center',
                          padding: '1vmax',
                        }}
                      >
                        UPDATE ORDER STATUS
                      </Typography>
                      <Typography
                        style={{
                          fontSize: '1.6vmax',
                          padding: '2vmax',
                          color: 'tomato',
                        }}
                        component={'h1'}
                      >
                        Order ID #{Item._id}
                      </Typography>
                      <div className="order-details-subpart">
                        <Typography style={{ fontSize: '2vmax', padding: '2vmax' }}>
                          Shipping Info
                        </Typography>
                        <div className="shipping-info-text">Name: {user.name}</div>
                        <div className="shipping-info-text">
                          Address: {`${Item.shippingInfo.address} ${Item.shippingInfo.state} ${Item.shippingInfo.country}`}
                        </div>
                        <div className="shipping-info-text">Phone: {Item.shippingInfo.phoneNo}</div>
                      </div>
                      <div style={{ marginLeft: '2vmax' }}>
                        <Typography
                          style={{
                            fontSize: '1.4vmax',
                            paddingBottom: '2vmax',
                            fontFamily: 'sans-serif',
                            fontWeight: 'bold',
                          }}
                        >
                          Payment Info
                        </Typography>
                        <div>Amount: ₹{Item.Totalprice}</div>
                        <Typography
                          style={{
                            fontSize: '1.4vmax',
                            paddingTop: '2vmax',
                            paddingBottom: '2vmax',
                            fontFamily: 'sans-serif',
                            fontWeight: 'bold',
                          }}
                        >
                          Order Status
                        </Typography>
                        <div>
                          <span>Status</span> :{' '}
                          <span className={`${Item.orderStatus === 'Delivered' ? 'greenColor' : 'redColor'}`}>
                            {Item.orderStatus}
                          </span>
                        </div>
                        <div className="payment-status-container2">
                          {
                            Item.orderStatus === "Delivered" ? 
                             ("") : 
                             (
                              <Fragment>
                                                              <select onChange={(e)=>setstatus(e.target.value)} >
                            <option className="option-test">Set Order Status</option>
                            {Item.orderStatus === 'Processing' ? (
                              <option className="option-test">Shipped</option>
                            ) : (
                              ''
                            )}
                            {Item.orderStatus === 'Shipped' ? (
                              <option className="option-test">Delivered</option>
                            ) : (
                              ''
                            )}
                          </select>
                          <br></br>
                          <Button 
                          disabled = { loading ? true : false || status === "" ? true : false}
                          onClick={() => updateOrderStatus()} className="order-status-btn">
                            Update
                          </Button>
                              </Fragment>
                             )
                          }
                          <div className='order-items-container' >
                            
                        <div >
                        {Item.orderItems.map((item)=>(
                          item.quantity
                        ))} 
                        </div>
                        <div>
                        X
                        </div>
                        <div>
                        ₹{Item.orderItems.map((item)=>(
                          item.price))} 
                        </div>
                        <div>
                        =
                        </div>
                        <div>
                        ₹{Item.itemsprice} (tax exclusive)
                        </div>
                      </div>
                        </div>
                        
                      </div>
                    </div>
                  </Fragment>
                ) : (
                  ''
                );
              })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default EditOrder;
