import React from 'react';
import {Text, StyleSheet, SafeAreaView, View} from 'react-native';

import {Color} from '../utils/color';

interface TransactionDetailScreenProps {
  id: number;
  amount: number;
  date: string;
  description: string;
  type: string;
  transactionID: string;
  status: string;
}

export const TransactionDetailScreen = (
  props: TransactionDetailScreenProps,
) => {
  const {transaction} = props.route.params;

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
          <Text style={styles.value}>{transaction.date}</Text>
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
    padding: 20,
  },
  section: {
    marginTop: 30,
    padding: 20,
    backgroundColor: Color.WHITE,
    borderRadius: 10,
    shadowColor: Color.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Color.BLACK,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.GRAY,
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: Color.BLACK,
  },
  amount: {
    fontSize: 24,
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
