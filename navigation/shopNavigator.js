import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';

import ProductOverviewScreen from '../screens/shop/ProductsOverview';
import ProductDetailsScreen from '../screens/shop/ProductDetails';
import UserProductsScreen from '../screens/user/UserProducts';
import CartScreen from '../screens/shop/Cart';
import OrdersScreen from '../screens/shop/Orders';
import Colors from '../constants/Colors';
import HeaderIcon from '../components/UI/HeaderIcon';
import EditProductScreen from '../screens/user/EditProducts';
import AuthScreen from '../screens/user/Auth';
import StartupScreen from '../screens/Startup';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/auth';
import { navigationRef } from './util';

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
          headerLeft: () => (
            <HeaderIcon
              title="Menu"
              iconName="bars"
              iconTitle="menu"
              handlePress={() => props.navigation.toggleDrawer()}
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
        options={{ title: 'My Cart' }}
      />
    </Stack.Navigator>
  );
};

const userProducts = () => {
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
        name="Admin"
        component={UserProductsScreen}
        options={props => ({
          title: 'My Products',
          headerRight: () => (
            <HeaderIcon
              title="Add"
              iconName="plus"
              iconTitle="Add"
              handlePress={() => props.navigation.navigate('Edit Product')}
            />
          ),
        })}
      />

      <Stack.Screen
        name="Edit Product"
        component={EditProductScreen}
        options={({ route }) => ({
          title: route.params ? route.params.item.title : 'Add Product',
        })}
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
        name="Admin"
        component={userProducts}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user-secret" size={25} color={color} />
          ),
          tabBarLabel: android ? (
            <Text style={styles.tabLabel}>My Products</Text>
          ) : (
            'My Products'
          ),
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

const AuthNavigator = () => {
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
        name="Auth"
        component={AuthScreen}
        options={{ title: 'Authenticate' }}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="ShopTabNavigator"
      drawerContentOptions={{
        activeTintColor: Colors.accent,
        activeBackgroundColor: '#f5f5f5',
        labelStyle: { fontFamily: 'OpenSans-Bold' },
      }}>
      <Drawer.Screen name="Products" component={ShopTabNavigator} />
    </Drawer.Navigator>
  );
};

const ContainerNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Startup"
          component={StartupScreen}
          options={{ title: 'Welcome to the shopping app' }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ title: 'Authenticate' }}
        />

        <Stack.Screen
          name="Products"
          component={DrawerNavigation}
          options={{ title: 'Products' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={({ focused, color, size }) => (
          <HeaderIcon
            title="Logout"
            iconName="power-off"
            iconTitle="Logout"
            color={color}
          />
        )}
        label="Logout"
        onPress={() => {
          dispatch(logout());
        }}
      />
    </DrawerContentScrollView>
  );
}
export default ContainerNavigator;
