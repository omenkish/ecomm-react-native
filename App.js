import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import NavigationsContainer from './navigation/NavigationContainer';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationsContainer />
    </Provider>
  );
};

export default App;
