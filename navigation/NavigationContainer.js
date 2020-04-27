import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ShopNavigator from './ShopNavigator';
import { navigate } from './util';

const NavigationsContainer = props => {
  const isAuth = useSelector(state => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navigate('Auth');
    }
  }, [isAuth]);

  return <ShopNavigator />;
};

export default NavigationsContainer;
