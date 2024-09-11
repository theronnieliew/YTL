import React from 'react';
import {Text, StyleSheet, SafeAreaView, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';

import {RootStackParamList} from '../navigator';
import {Color, scale, verticalScale} from '../utils';

type TransactionDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;

export const TransactionDetailScreen = ({
  route,
}: TransactionDetailScreenProps) => {
  const {transaction} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Transaction Info</Text>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.amount}>RM {transaction.amount.toFixed(2)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>
            {moment(transaction.date).format('DD MMM YYYY, h:mm A')}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{transaction.description}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Transaction Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Type</Text>
          <Text style={styles.value}>{transaction.type}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Transaction ID</Text>
          <Text style={styles.value}>{transaction.transactionID}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Status</Text>
          <Text
            style={[
              styles.value,
              transaction.status === 'failed'
                ? styles.statusFailed
                : styles.statusSuccessful,
            ]}>
            {transaction.status}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  section: {
    marginTop: verticalScale(30),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
    backgroundColor: Color.WHITE,
    borderRadius: scale(10),
    shadowColor: Color.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: scale(10),
    elevation: 3,
  },
  sectionHeader: {
    fontSize: scale(20),
    fontWeight: 'bold',
    marginBottom: verticalScale(15),
    color: Color.BLACK,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  label: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: Color.GRAY,
  },
  value: {
    fontSize: scale(16),
    color: Color.BLACK,
  },
  amount: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: Color.BLACK,
  },
  statusSuccessful: {
    color: Color.GREEN,
  },
  statusFailed: {
    color: Color.RED,
  },
});
