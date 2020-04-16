import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';

const CartItem = ({ item, onRemove, addItem, reduceItemQty }) => {
  return (
    <View style={styles.item}>
      <View style={{ ...styles.itemData, ...styles.addedStyle }}>
        <Text style={styles.text}>{item.productTitle}</Text>
        <View style={styles.quantityContainer}>
          {reduceItemQty && (
            <TouchableOpacity onPress={reduceItemQty}>
              <Text style={styles.minus}>-</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.quantity}>Qty: {item.quantity} </Text>
          {addItem && (
            <TouchableOpacity onPress={addItem}>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{ ...styles.itemData, ...styles.price }}>
        <Text style={styles.text}>${item.sum.toFixed(2)}</Text>
        {onRemove && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Icon name="trash" size={23} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemData: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addedStyle: {
    flex: 3,
    justifyContent: 'space-between',
  },
  quantity: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: '#888',
  },
  text: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.1,
    borderColor: '#888',
    borderRadius: 4,
    padding: 6,
  },
  plus: {
    fontSize: 20,
  },
  minus: {
    fontSize: 20,
    marginRight: 5,
  },
  price: {
    justifyContent: 'space-around',
  },
});

export default CartItem;
