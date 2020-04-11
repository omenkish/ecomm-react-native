import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/productItem';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          item={item}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

export default ProductsOverviewScreen;
