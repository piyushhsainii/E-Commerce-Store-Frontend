import React, { Fragment } from 'react';
import MetaData from '../MetaData';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/core';

const OrderDetails = ({ match }) => {
  const { loading, MyOrders } = useSelector((state) => state.MyOrder);
  const { user } = useSelector((state) => state.user);

  return (
    <Fragment>
      <MetaData title={'Order Details'} />
      {MyOrders &&
        MyOrders.map((Item) => (
          Item._id === match.params.id ? (
            <div key={Item._id} className="order-details-container">
              <Typography style={{ fontSize: '1.6vmax', padding: '2vmax', color: 'tomato' }} component={'h1'}>
                Order ID #{Item._id}
              </Typography>
              <div className="order-details-subpart">
                <Typography style={{ fontSize: '2vmax', padding: '2vmax' }}>Shipping Info</Typography>
                <div className="shipping-info-text">Name: {user.name}</div>
                <div className="shipping-info-text">
                  Address: {`${Item.shippingInfo.address} ${Item.shippingInfo.state} ${Item.shippingInfo.country}`}
                </div>
                <div className="shipping-info-text">Phone: {Item.shippingInfo.phoneNo}</div>
              </div>
              <div className="payment-status-container">
                <Typography style={{ fontSize: '1.4vmax', paddingBottom: '2vmax', fontFamily: 'sans-serif' }}>
                  Payment Info
                </Typography>
                <div>Amount: ₹{Item.Totalprice}</div>
                <Typography
                  style={{ fontSize: '1.4vmax', paddingTop: '2vmax', paddingBottom: '2vmax', fontFamily: 'sans-serif' }}
                >
                  Order Status
                </Typography>
                <div>
                  <span>Status</span> :{' '}
                  <span className={`${Item.orderStatus === 'Delivered' ? 'greenColor' : 'redColor'}`}>
                    {Item.orderStatus}
                  </span>
                </div>
              </div>
              <div className="order-items-container">
                {Item.orderItems.map((item) => (
                  <div key={item._id} className="order-item" style={{display:"flex", alignItems:"center", gap:"4vmax"}} >
                    <img className="order-details-thumbnail" src={item.image} alt="" />
                    <div style={{ fontSize: '1.6vmax', fontWeight:"600"}} >
                      {item.quantity }  X  ₹{item.price} = ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ''
          )
        ))}
    </Fragment>
  );
};

export default OrderDetails;
