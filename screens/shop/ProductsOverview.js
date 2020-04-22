import React from 'react';
import { Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/productItem';
import { addToCart } from '../../redux/actions/cart';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);

  const dispatch = useDispatch();

  const selectItemHandler = item => {
    props.navigation.navigate('ProductDetail', { item });
  };

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductItem item={item} onSelect={() => selectItemHandler(item)}>
          <Button
            title="View Details"
            onPress={() => selectItemHandler(item)}
            color={Colors.primary}
          />
          <Button
            title="Add to Cart"
            onPress={() => {
              dispatch(addToCart(item));
            }}
            color={Colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;
