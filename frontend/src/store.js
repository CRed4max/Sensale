import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  adminProductReducer,
  newProductReducer,
  newReviewReducer,
  productReducers,
  productReviewsReducer,
  reviewReducer,
  UpdateProductReducer,
} from './reducers/productReducers';
import { productDetailsReducers } from './reducers/productReducers';
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
  allUsersReducer,
  userDetailsReducer,
} from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from './reducers/orderReducer';
const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailsReducers,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  product: adminProductReducer,
  allUsers: allUsersReducer,
  updateProduct: UpdateProductReducer,
  newProduct: newProductReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  userDetails: userDetailsReducer,
  review: reviewReducer,
  productReviews: productReviewsReducer,
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
