import React from 'react';
import { Alert, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/productItem';
import Colors from '../../constants/Colors';
import { deleteProduct } from '../../redux/actions/products';

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const deleteHandler = item => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => dispatch(deleteProduct(item.id)),
      },
    ]);
  };

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
            onPress={deleteHandler.bind(this, item)}
            color={Colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
