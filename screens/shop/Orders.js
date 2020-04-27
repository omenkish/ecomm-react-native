import React, { useEffect, useState, useCallback } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import OrderItem from '../../components/shop/OrderItem';
import { fetchOrders } from '../../redux/actions/orders';
import Loader, { styles } from '../../components/UI/Loader';
import Colors from '../../constants/Colors';

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await dispatch(fetchOrders());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRefreshing(false);
    }
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadOrders().then(() => setIsLoading(false));
  }, [dispatch, loadOrders]);

  if (isLoading) {
    return <Loader size="large" color={Colors.primary} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured! ☹️</Text>
        <Button title="Try again" color={Colors.primary} onPress={loadOrders} />
      </View>
    );
  }
  if (!orders.length) {
    return (
      <View style={styles.centered}>
        <Text>You currently have no orders ☹️</Text>
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={loadOrders}
      refreshing={isRefreshing}
      data={orders}
      renderItem={({ item }) => {
        return (
          <OrderItem
            amount={item.totalAmount}
            date={item.readableDate}
            items={item.items}
          />
        );
      }}
    />
  );
};

export default OrdersScreen;
