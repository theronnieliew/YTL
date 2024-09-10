import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TransactionHistoryScreen, TransactionDetailScreen} from '../screens';

export type RootStackParamList = {
  History: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        // options={{headerShown: false}}
        name="History"
        component={TransactionHistoryScreen}
      />
      <Stack.Screen
        name="Details"
        component={TransactionDetailScreen}
        // options={{
        //   headerTitle: '',
        //   headerBackTitleVisible: false,
        //   headerTintColor: Color.SELECTED,
        // }}
      />
    </Stack.Navigator>
  );
};
