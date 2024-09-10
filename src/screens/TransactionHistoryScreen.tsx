import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Alert, Button} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigator';

type TransactionHistoryScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'History'
>;

interface Props {
  navigation: TransactionHistoryScreenProp;
}

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
        Alert.alert('Authentication Failed');
      }
    } else {
      Alert.alert('Biometric Authentication not available');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {authenticated ? (
        <Text style={styles.title}>Transaction History...</Text>
      ) : (
        <Text style={styles.title}>
          Please authenticate to access your transactions
        </Text>
      )}
      <Button
        title="Retry Authentication"
        onPress={handleBiometricAuthentication}
      />
      <Button
        title="Navigate to detail"
        onPress={() => navigation.navigate('Details')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
  },
});
