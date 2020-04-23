import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import {
  addQuantity,
  reduceQuantity,
  deleteFromCart,
} from '../../redux/actions/cart';
import { addOrder } from '../../redux/actions/orders';
import Card from '../../components/UI/Card';
import Loader from '../../components/UI/Loader';

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => {
    const transformedCart = [];
    for (const key in state.cart.items) {
      transformedCart.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCart.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  useEffect(() => {
    if (error) {
      Alert.alert('Error!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const handleSendOrder = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(addOrder(cartItems, cartTotalAmount));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <Loader size="small" color={Colors.primary} />
        ) : (
          <Button
            title="Order Now"
            color={Colors.accent}
            disabled={cartItems.length === 0}
            onPress={handleSendOrder}
          />
        )}
      </Card>
      <View style={styles.items}>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onRemove={() => dispatch(deleteFromCart(item.productId))}
              addItem={() => dispatch(addQuantity(item))}
              reduceItemQty={() => dispatch(reduceQuantity(item.productId))}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'OpenSans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
  items: {
    backgroundColor: 'red',
  },
});

export default CartScreen;
