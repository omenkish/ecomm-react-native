import React from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../../constants/Colors';

const ProductDetailScreen = props => {
  const { item } = props.route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.actions}>
        <Button title="Add to Cart" color={Colors.primary} />
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
    marginHorizontal: 20,
    fontFamily: 'OpenSans-Regular',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingHorizontal: 15,
  },
});

export default ProductDetailScreen;
