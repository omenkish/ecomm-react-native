import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import productReducer from './reducers/products';
import cartReducer from './reducers/cart';
import orderReducer from './reducers/orders';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk),
  composeWithDevTools(),
);

export default store;
