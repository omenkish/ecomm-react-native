import React from 'react';
import { Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import deleteProduct from '../../redux/actions/products';

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = item => {
    props.navigation.navigate('Edit Product', { item });
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ProductItem item={item} onSelect={() => editProductHandler(item)}>
          <Button
            title="Edit"
            onPress={() => editProductHandler(item)}
            color={Colors.primary}
          />
          <Button
            title="Delete"
            onPress={() => dispatch(deleteProduct(item.id))}
            color={Colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
