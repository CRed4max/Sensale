import './App.css';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, { useState } from 'react';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails.js';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';
import store from './store';
import LoginSignUp from './component/User/LoginSignUp';
import Profile from './component/User/Profile';
import Cart from './component/Cart/Cart.js';
import Shipping from './component/Cart/Shipping.js';
import ConfirmOrder from './component/Cart/ConfirmOrder.js';
import Payment from './component/Cart/Payment.js';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions.js';
import { useSelector } from 'react-redux';
import ProtectedRoute from './component/Route/ProtectedRoute';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto'],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/product/:id' element={<ProductDetails />}></Route>
        <Route exact path='/products' element={<Products />}></Route>
        <Route exact path='/products/:keyword' element={<Products />}></Route>
        <Route exact path='/search' element={<Search />}></Route>
        <Route exact path='/login' element={<LoginSignUp />}></Route>
        <Route exact path='/cart' element={<Cart />}></Route>
        <Route
          exact
          path='/account'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path='/shipping'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Shipping />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path='/order/confirm'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path='/password/update'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdatePassword />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path='/password/forgot'
          element={<ForgotPassword />}
        ></Route>
        <Route exact path='/me/update' element={<UpdateProfile />}></Route>
        <Route
          exact
          path='/password/reset/:token'
          element={<ResetPassword />}
        ></Route>
      </Routes>
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Routes>
          <Route
            exact
            path='/process/payment'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Payment />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Elements>
      <Footer />
    </Router>
  );
}

export default App;
