import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from './HeaderButton';

const HeaderIcon = props => {
  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title={props.iconTitle}
        iconName={props.iconName}
        onPress={props.handlePress}
      />
    </HeaderButtons>
  );
};

export default HeaderIcon;
