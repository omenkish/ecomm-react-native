import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import productReducer from './reducers/products';
import cartReducer from './reducers/cart';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
