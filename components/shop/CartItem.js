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
          <TouchableOpacity onPress={reduceItemQty}>
            <Text style={styles.plus}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>Qty: {item.quantity} </Text>
          <TouchableOpacity onPress={addItem}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.text}>${item.sum.toFixed(2)}</Text>
        <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
          <Icon name="trash" size={23} color={Colors.primary} />
        </TouchableOpacity>
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addedStyle: {
    flex: 3,
    justifyContent: 'space-around',
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
  },
  plus: {
    fontSize: 20,
    paddingLeft: 8,
  },
});

export default CartItem;
