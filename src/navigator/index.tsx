import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TransactionHistoryScreen, TransactionDetailScreen} from '../screens';
import {Color} from '../utils/color';

export type RootStackParamList = {
  History: undefined;
  Details: undefined;
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
          headerTintColor: Color.SELECTED,
        }}
      />
    </Stack.Navigator>
  );
};
