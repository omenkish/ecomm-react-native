import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import ProductOverviewScreen from '../screens/shop/ProductsOverview';
import ProductDetailsScreen from '../screens/shop/ProductDetails';
import CartScreen from '../screens/shop/Cart';
import OrdersScreen from '../screens/shop/Orders';
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
        options={{ title: 'Your Cart' }}
      />
    </Stack.Navigator>
  );
};

const ShopTabNavigator = () => {
  const android = Platform.OS === 'android';
  let Tab = createBottomTabNavigator();
  if (android) {
    Tab = createMaterialBottomTabNavigator();
  }
  return (
    <Tab.Navigator
      activeColor={Colors.primary}
      barStyle={styles.barStyle}
      tabBarOptions={{
        activeTintColor: 'white',
      }}
      shifting={true}>
      <Tab.Screen
        name="Products"
        component={productsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={25} color={color} />
          ),
          tabBarLabel:
            Platform.OS === 'android' ? (
              <Text style={styles.tabLabel}>Products</Text>
            ) : (
              'Products'
            ),
          tabBarColor: Colors.primaryColor,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="product-hunt" size={25} color={color} />
          ),
          tabBarLabel: android ? (
            <Text style={styles.tabLabel}>Orders</Text>
          ) : (
            'Orders'
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontFamily: 'OpenSans-Bold',
  },
  barStyle: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
});
export default ShopTabNavigator;
