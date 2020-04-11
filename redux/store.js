import { createStore, combineReducers } from 'redux';

import productReducer from './reducers/products';

const rootReducer = combineReducers({
  products: productReducer,
});

const store = createStore(rootReducer);

export default store;
