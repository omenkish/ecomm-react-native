import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HeaderButton } from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';

const CustomHeaderButton = props => (
  <HeaderButton
    {...props}
    IconComponent={Icon}
    iconSize={23}
    color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
  />
);

export default CustomHeaderButton;
