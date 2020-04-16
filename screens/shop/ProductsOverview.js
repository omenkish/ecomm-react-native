import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../redux/actions/cart';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);

  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          item={item}
          onViewDetail={() => {
            props.navigation.navigate('ProductDetail', { item });
          }}
          onAddToCart={() => {
            dispatch(addToCart(item));
          }}
        />
      )}
    />
  );
};

export default ProductsOverviewScreen;
