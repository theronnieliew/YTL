import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {TransactionItem} from '../components';
import {Color} from '../utils/color';
import {RootStackParamList} from '../navigator';
import {mockApi} from '../api';

type TransactionHistoryScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'History'
>;

interface Props {
  navigation: TransactionHistoryScreenProp;
}

interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
  type: string;
  transactionID: string;
  status: string;
}

export const TransactionHistoryScreen = ({navigation}: Props) => {
  const [authenticated, setAuthenticated] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleBiometricAuthentication();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await mockApi.fetchTransactionData();
        setTransactions(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Color.BLACK} />
        <Text>Loading transactions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {authenticated ? (
          <>
            <Text style={styles.title}>Transaction History</Text>
            <FlatList
              data={transactions}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
});
