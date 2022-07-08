import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducers } from './reducers/productReducers';
import { productDetailsReducers } from './reducers/productReducers';
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { newOrderReducer } from './reducers/orderReducer';
const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailsReducers,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
