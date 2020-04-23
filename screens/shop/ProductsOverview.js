import React, { useEffect, useState, useCallback } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/productItem';
import { addToCart } from '../../redux/actions/cart';
import Colors from '../../constants/Colors';
import { fetchProducts } from '../../redux/actions/products';
import Loader, { styles } from '../../components/UI/Loader';

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const products = useSelector(state => state.products.availableProducts);

  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener(
      'focus',
      loadProducts,
    );
    return willFocusSubscription;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const selectItemHandler = item => {
    props.navigation.navigate('ProductDetail', { item });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured! ☹️</Text>
        <Button
          title="Try again"
          color={Colors.primary}
          onPress={loadProducts}
        />
      </View>
    );
  }
  if (isLoading) {
    return <Loader size="large" color={Colors.primary} />;
  }
  if (!isLoading && !products.length) {
    return (
      <View style={styles.centered}>
        <Text>No products found</Text>
      </View>
    );
  }
  return (
    <FlatList
      keyExtractor={item => item.id}
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
