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
  RefreshControl,
  AppState,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Transaction} from '../types/interfaces';
import {TransactionItem} from '../components';
import {Color, scale, verticalScale} from '../utils';
import {RootStackParamList} from '../navigator';
import {mockApi} from '../api';

type TransactionHistoryScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'History'
>;

interface Props {
  navigation: TransactionHistoryScreenProp;
}

export const TransactionHistoryScreen = ({navigation}: Props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchData();

    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background') {
        setAuthenticated(false);
      } else if (nextAppState === 'active') {
        if (!authenticated) handleBiometricAuthentication();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [authenticated]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await mockApi.fetchTransactionData();
      setTransactions(data);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleBiometricAuthentication = async () => {
    if (authenticated) return;

    const rnBiometrics = new ReactNativeBiometrics();
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();

    if (
      available &&
      (biometryType === 'TouchID' || biometryType === 'FaceID')
    ) {
      try {
        const {success} = await rnBiometrics.simplePrompt({
          promptMessage: 'Authenticate to view transactions',
        });

        if (success) setAuthenticated(true);
      } catch (error) {
        console.error('Biometric authentication error:', error);
      }
    } else {
      Alert.alert('Biometric Authentication not available');
    }
  };

  if (loading && !refreshing) {
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
                    navigation.navigate('Details', {transaction: item} as {
                      transaction: Transaction;
                    })
                  }
                />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
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
    marginHorizontal: scale(10),
  },
  title: {
    fontSize: scale(22),
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.BLACK,
    marginBottom: verticalScale(20),
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
    fontSize: scale(12),
    color: Color.RED,
  },
});
