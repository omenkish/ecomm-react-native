import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loader = props => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator {...props} />
    </View>
  );
};

export const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
