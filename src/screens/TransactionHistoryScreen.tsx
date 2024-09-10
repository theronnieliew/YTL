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
    amount: 50.75,
    date: '2024-09-01',
    description: 'Grocery shopping',
    type: 'debit',
    transactionID: 'd2346345gdf23423fsddfs',
    status: 'successful',
  },
  {
    id: 2,
    amount: 500.0,
    date: '2024-09-03',
    description: 'Salary',
    type: 'credit',
    transactionID: 'g234fg4dfg43534fdg24523',
    status: 'successful',
  },
  {
    id: 3,
    amount: 35.99,
    date: '2024-09-05',
    description: 'Online subscription',
    type: 'debit',
    transactionID: 'vn4354fg3452353cfbcg2443',
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
