import './App.css';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React from 'react';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails.js';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';
import store from './store';
import LoginSignUp from './component/User/LoginSignUp';
import Profile from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile.js';
import { loadUser } from './actions/userAction';
import UserOptions from  "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import ProtectedRoute from './component/Route/ProtectedRoute';
function App() {
  
  const {isAuthenticated,user} = useSelector((state)=>state.user)
  
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto'],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user = {user}/>}
      <Routes>
       
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/product/:id' element={<ProductDetails />}></Route>
        <Route exact path='/products' element={<Products />}></Route>
        <Route exact path='/products/:keyword' element={<Products />}></Route>
        <Route exact path='/search' element={<Search />}></Route>
        <Route exact path='/login' element={<LoginSignUp />}></Route>
        <Route exact path='/account' element={<ProtectedRoute isAuthenticated= {isAuthenticated}><Profile /></ProtectedRoute>}></Route>
        <Route exact path='/me/update' element={<UpdateProfile />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
