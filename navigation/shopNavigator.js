import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ProductOverviewScreen from '../screens/shop/ProductsOverview';
import ProductDetailsScreen from '../screens/shop/ProductDetails';
import CartScreen from '../screens/shop/Cart';
import Colors from '../constants/Colors';
import HeaderIcon from '../components/UI/HeaderIcon';

const Stack = createStackNavigator();

const productsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: { fontFamily: 'OpenSans-Regular' },
      }}>
      <Stack.Screen
        name="Products"
        component={ProductOverviewScreen}
        options={props => ({
          title: 'All Products',
          headerRight: () => (
            <HeaderIcon
              title="Cart"
              iconName="shopping-cart"
              iconTitle="Shopping Cart"
              handlePress={() => props.navigation.navigate('Cart')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailsScreen}
        options={({ route }) => ({
          title: route.params.item.title,
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Cart' }}
      />
    </Stack.Navigator>
  );
};

export default productsNavigator;
