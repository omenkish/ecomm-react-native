/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/UI/Loader';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { authenticate } from '../redux/actions/auth';

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getDataFromStorage = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.replace('Auth');
        return;
      }
      const { token, userId, expiryDate } = JSON.parse(userData);
      const isTokenExpired = new Date(expiryDate) <= new Date();

      if (isTokenExpired || !token || !userId) {
        props.navigation.replace('Auth');
        return;
      }
      const expirationTime = expiryDate.getTime() - new Date().getTime();

      props.navigation.replace('Products');
      dispatch(authenticate(token, userId, expirationTime));
    };

    getDataFromStorage();
  }, [dispatch]);

  return <Loader size="large" color={Colors.primary} />;
};

export default StartupScreen;
