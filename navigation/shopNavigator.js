import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ProductOverviewScreen from '../screens/shop/ProductsOverview';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const productsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      }}>
      <Stack.Screen
        name="Products"
        component={ProductOverviewScreen}
        options={{
          title: 'All Products',
        }}
      />
    </Stack.Navigator>
  );
};

export default productsNavigator;
