import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    try {
      const response = await fetch(
        'https://react-native-shopping-fac8a.firebaseio.com/products.json',
      );

      if (!response.ok) {
        throw new Error('Something went wrong!!');
      }
      const responseData = await response.json();
      const loadedProducts = [];

      for (const key in responseData) {
        loadedProducts.push(
          new Product(
            key,
            responseData[key].ownerId,
            responseData[key].title,
            responseData[key].imageUrl,
            responseData[key].description,
            responseData[key].price,
          ),
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    const response = await fetch(
      `https://react-native-shopping-fac8a.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong!!');
    }
    dispatch({ type: DELETE_PRODUCT, productId: productId });
  };
};

export const addProduct = product => {
  return async (dispatch, getState) => {
    const { token, userId } = getState().auth;
    const newProduct = { ...product };
    delete newProduct.id;
    newProduct.ownerId = userId;
    const response = await fetch(
      `https://react-native-shopping-fac8a.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newProduct }),
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong!!');
    }
    const responseData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      product: { ...newProduct, id: responseData.name },
    });
  };
};

export const updateProduct = product => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    const newProduct = { ...product };
    delete newProduct.price;

    const response = await fetch(
      `https://react-native-shopping-fac8a.firebaseio.com/products/${
        product.id
      }.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newProduct }),
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong!!');
    }
    dispatch({ type: UPDATE_PRODUCT, product: { ...product } });
  };
};
