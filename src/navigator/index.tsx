import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Transaction} from '../types/interfaces';
import {TransactionHistoryScreen, TransactionDetailScreen} from '../screens';

export type RootStackParamList = {
  History: undefined;
  Details: {transaction: Transaction};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="History"
        component={TransactionHistoryScreen}
      />
      <Stack.Screen
        name="Details"
        component={TransactionDetailScreen}
        options={{
          headerTitle: 'Details',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
