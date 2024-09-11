import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import moment from 'moment';

import {Color} from '../utils/color';

interface TransactionItemProps {
  date: string;
  description: string;
  type: string;
  amount: number;
  onPress: (event: GestureResponderEvent) => void;
}

export const TransactionItem = (props: TransactionItemProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={styles.text}>
          {moment(props.date).format('DD MMM YYYY, h:mm A')}
        </Text>
        <Text style={styles.text}>{props.description}</Text>
        <Text style={styles.desc}>{props.type}</Text>
      </View>
      <Text style={styles.amount}>RM {props.amount.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 80,
    width: '100%',
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.WHITE,
    elevation: 3,
    shadowColor: Color.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  leftContent: {
    flex: 1,
  },
  text: {
    color: Color.BLACK,
    fontSize: 16,
    marginBottom: 5,
  },
  desc: {
    color: Color.GRAY,
    fontSize: 14,
  },
  amount: {
    color: Color.BLACK,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
