import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const date = new Date();
    const response = await fetch(
      `https://react-native-shopping-fac8a.firebaseio.com/orders/${userId}.json`,
      {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong!!');
    }
    const responseData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: responseData.name,
        items: cartItems,
        amount: totalAmount,
        date,
      },
    });
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    try {
      const response = await fetch(
        `https://react-native-shopping-fac8a.firebaseio.com/orders/${userId}.json`,
      );

      if (!response.ok) {
        throw new Error('Something went wrong!!');
      }
      const responseData = await response.json();
      const loadedOrders = [];

      for (const key in responseData) {
        loadedOrders.push(
          new Order(
            key,
            responseData[key].cartItems,
            responseData[key].totalAmount,
            new Date(responseData[key].date),
          ),
        );
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (error) {
      throw error;
    }
  };
};
