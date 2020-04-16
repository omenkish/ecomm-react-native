import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import {
  addQuantity,
  reduceQuantity,
  deleteFromCart,
} from '../../redux/actions/cart';
import { addOrder } from '../../redux/actions/orders';

const CartScreen = props => {
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

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.accent}
          disabled={cartItems.length === 0}
          onPress={() => dispatch(addOrder(cartItems, cartTotalAmount))}
        />
      </View>
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
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
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
