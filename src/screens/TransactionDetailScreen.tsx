import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';

export const TransactionDetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Transaction Detail Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});
