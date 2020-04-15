export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const REDUCE_QUANTITY = 'REDUCE_QUANTITY';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';

export const addToCart = product => {
  return { type: ADD_TO_CART, product: product };
};

export const addQuantity = product => {
  return { type: ADD_QUANTITY, product: product };
};

export const reduceQuantity = productId => {
  return { type: REDUCE_QUANTITY, productId: productId };
};

export const deleteFromCart = productId => {
  return { type: DELETE_FROM_CART, productId: productId };
};
