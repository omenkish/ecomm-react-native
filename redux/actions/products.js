export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
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
        loadedProducts.push({
          id: key,
          ownerId: 'u1',
          title: responseData[key].title,
          imageUrl: responseData[key].imageUrl,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = productId => {
  return async dispatch => {
    const response = await fetch(
      `https://react-native-shopping-fac8a.firebaseio.com/products/${productId}.json`,
      {
        method: 'DELETE',
      },
    );

    dispatch({ type: DELETE_PRODUCT, productId: productId });
  };
};

export const addProduct = product => {
  return async dispatch => {
    const newProduct = { ...product };
    delete newProduct.id;
    const response = await fetch(
      'https://react-native-shopping-fac8a.firebaseio.com/products.json',
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
      product: { ...product, id: responseData.name },
    });
  };
};

export const updateProduct = product => {
  return async dispatch => {
    const newProduct = { ...product };
    delete newProduct.price;

    const response = await fetch(
      `https://react-native-shopping-fac8a.firebaseio.com/products/${
        product.id
      }.json`,
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
