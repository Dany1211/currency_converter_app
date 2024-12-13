import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import type {PropsWithChildren} from 'react';

type CurrencyButtonProps = PropsWithChildren<{
  name: string;
  flag: string;
}>;

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
  const {name, flag} = props;

  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.textFlag}>{props.flag}</Text>
      <Text style={styles.textName}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
  textFlag: {
    fontSize : 28 ,
    color : "#FFFFFF",
    margin : 5 ,
  },
  textName: {
    fontSize : 18 ,
    color : "#000000",
    margin : 5 ,
  },
});

export default CurrencyButton;
