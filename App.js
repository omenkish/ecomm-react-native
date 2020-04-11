import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { Providers } from 'react-redux';

import store from './store/store';

const App = () => {
  return (
    <Providers store={store}>
      <NavigationContainer>
        <View>
          <Text>Hello.......</Text>
        </View>
      </NavigationContainer>
    </Providers>
  );
};

export default App;
