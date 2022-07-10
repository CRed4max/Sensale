import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '../layout/MetaData';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import SideBar from './Sidebar';
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from '../../actions/orderAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { Button } from '@material-ui/core';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import './processOrder.css';
import { getProductDetails, updateProduct } from '../../actions/productAction';

const ProcessOrder = () => {
  const { id } = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { product } = useSelector((state) => state.productDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('status', status);

    dispatch(updateOrder(id, myForm));

    if (status === 'Shipped') {
      order.orderItems.map((item) => {
        const newForm = new FormData();

        const pid = item.product;

        if (pid) {
          dispatch(getProductDetails(pid));
        }

        newForm.set('name', product.name);
        newForm.set('price', product.price);
        newForm.set('description', product.description);
        newForm.set('category', product.category);
        newForm.set('Stock', product.Stock - item.quantity);

        dispatch(updateProduct(pid, newForm)); 
      });
    }
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState('');

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success('Order Updated Successfully');
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title='Process Order' />
      <div className='dashboard'>
        <SideBar />
        <div className='newProductContainer'>
          {loading ? (
            <Loader />
          ) : (
            <div
              className='confirmOrderPage'
              style={{
                display: order.orderStatus === 'Delivered' ? 'block' : 'grid',
              }}
            >
              <div>
                <div className='confirmshippingArea'>
                  <Typography>Shipping Info</Typography>
                  <div className='orderDetailsContainerBox'>
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className='orderDetailsContainerBox'>
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === 'succeeded'
                            ? 'greenColor'
                            : 'redColor'
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === 'succeeded'
                          ? 'PAID'
                          : 'NOT PAID'}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className='orderDetailsContainerBox'>
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === 'Delivered'
                            ? 'greenColor'
                            : 'redColor'
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='confirmCartItems'>
                  <Typography>Your Cart Items:</Typography>
                  <div className='confirmCartItemsContainer'>
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt='Product' />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{' '}
                          <span>
                            {item.quantity} X ₹{item.price} ={' '}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === 'Delivered' ? 'none' : 'block',
                }}
              >
                <form
                  className='updateOrderForm'
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value=''>Choose Category</option>
                      {order.orderStatus === 'Processing' && (
                        <option value='Shipped'>Shipped</option>
                      )}

                      {order.orderStatus === 'Shipped' && (
                        <option value='Delivered'>Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id='createProductBtn'
                    type='submit'
                    disabled={
                      loading ? true : false || status === '' ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
