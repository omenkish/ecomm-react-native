import {
  ADD_TO_CART,
  ADD_QUANTITY,
  REDUCE_QUANTITY,
  DELETE_FROM_CART,
} from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart_item';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          addedProduct.price,
          addedProduct.title,
          state.items[addedProduct.id].sum + addedProduct.price,
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice,
        );
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice,
      };
    case DELETE_FROM_CART:
      const itemToRemove = state.items[action.productId];
      const updatedItems = deleteProduct(state.items, action.productId);
      return {
        ...state,
        items: updatedItems,
        totalAmount:
          state.totalAmount - itemToRemove.productPrice * itemToRemove.quantity,
      };

    case ADD_QUANTITY:
      const newProduct = action.product;
      const updatedItem = new CartItem(
        newProduct.quantity + 1,
        newProduct.productPrice,
        newProduct.productTitle,
        newProduct.sum + newProduct.productPrice,
      );
      return {
        ...state,
        items: { ...state.items, [newProduct.productId]: updatedItem },
        totalAmount: state.totalAmount + newProduct.productPrice,
      };
    case REDUCE_QUANTITY:
      const productToRemove = state.items[action.productId];
      let updatedProducts;

      if (productToRemove.quantity === 1) {
        updatedProducts = deleteProduct(state.items, action.productId);
      } else {
        const updatedProduct = new CartItem(
          productToRemove.quantity - 1,
          productToRemove.productPrice,
          productToRemove.productTitle,
          productToRemove.sum - productToRemove.productPrice,
        );
        updatedProducts = {
          ...state.items,
          [action.productId]: updatedProduct,
        };
      }

      return {
        ...state,
        items: updatedProducts,
        totalAmount: state.totalAmount - productToRemove.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    default:
      return state;
  }
};

const deleteProduct = (items, productId) => {
  const updatedProducts = Object.keys(items).reduce((object, key) => {
    if (key !== productId) {
      object[key] = items[key];
    }
    return object;
  }, {});
  return updatedProducts;
};
