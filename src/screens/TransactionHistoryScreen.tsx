import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
  Button,
  FlatList,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {TransactionItem} from '../components';
import {Color} from '../utils/color';
import {RootStackParamList} from '../navigator';

type TransactionHistoryScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'History'
>;

interface Props {
  navigation: TransactionHistoryScreenProp;
}

const mockData = [
  {
    id: 1,
    amount: 362.25,
    date: '2024-10-25 07:13:26',
    description: 'Salary',
    type: 'debit',
    transactionID: '112020F162024102507132656',
    status: 'failed',
  },
  {
    id: 2,
    amount: 192.98,
    date: '2024-10-04 13:33:37',
    description: 'Insurance payment',
    type: 'credit',
    transactionID: '112020F162024100413333772',
    status: 'successful',
  },
  {
    id: 3,
    amount: 38.4,
    date: '2024-09-21 18:39:50',
    description: 'Utility bill',
    type: 'credit',
    transactionID: '112020F162024092118395041',
    status: 'successful',
  },
  {
    id: 4,
    amount: 123.5,
    date: '2024-09-10 21:47:12',
    description: 'Grocery shopping',
    type: 'debit',
    transactionID: '112020F162024091021471273',
    status: 'successful',
  },
  {
    id: 5,
    amount: 76.45,
    date: '2024-09-11 09:14:55',
    description: 'Online subscription',
    type: 'debit',
    transactionID: '112020F162024091109145598',
    status: 'failed',
  },
  {
    id: 6,
    amount: 450.0,
    date: '2024-09-12 14:27:43',
    description: 'Salary',
    type: 'credit',
    transactionID: '112020F162024091214274366',
    status: 'successful',
  },
  {
    id: 7,
    amount: 15.3,
    date: '2024-09-13 12:36:19',
    description: 'Coffee',
    type: 'debit',
    transactionID: '112020F162024091312361901',
    status: 'successful',
  },
  {
    id: 8,
    amount: 875.0,
    date: '2024-09-14 19:55:10',
    description: 'Rent',
    type: 'debit',
    transactionID: '112020F162024091419551087',
    status: 'successful',
  },
  {
    id: 9,
    amount: 45.25,
    date: '2024-09-15 10:23:34',
    description: 'Dinner',
    type: 'debit',
    transactionID: '112020F162024091510233499',
    status: 'successful',
  },
  {
    id: 10,
    amount: 19.99,
    date: '2024-09-16 08:07:15',
    description: 'Movie ticket',
    type: 'debit',
    transactionID: '112020F162024091608071522',
    status: 'failed',
  },
];
export const TransactionHistoryScreen = ({navigation}: Props) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    handleBiometricAuthentication();
  }, []);

  const handleBiometricAuthentication = async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    const {available, biometryType} = await rnBiometrics.isSensorAvailable();

    if (
      available &&
      (biometryType === 'TouchID' || biometryType === 'FaceID')
    ) {
      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to view transactions',
      });

      if (success) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        Alert.alert('Authentication Failed');
      }
    } else {
      Alert.alert('Biometric Authentication not available');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {authenticated ? (
          <>
            <Text style={styles.title}>Transaction History</Text>
            <FlatList
              data={mockData}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TransactionItem
                  description={item.description}
                  date={item.date}
                  type={item.type}
                  amount={item.amount}
                  onPress={() =>
                    navigation.navigate('Details', {transaction: item})
                  }
                />
              )}
            />
          </>
        ) : (
          <View>
            <Text style={styles.title}>
              Authenticate to access your transactions
            </Text>
            <Button
              title="Click here to authenticate"
              onPress={handleBiometricAuthentication}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.BACKGROUND,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Color.BACKGROUND,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
});
