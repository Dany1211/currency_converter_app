import React, {useState} from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';

import {Currency} from './constants';
import Snackbar from 'react-native-snackbar';

function App(): React.JSX.Element {
  const [inputValue, SetInputValue] = useState('');
  const [resultValue, SetResultValue] = useState('');
  const [targetCurrency, SetTargetCurrency] = useState('');

  const buttonPressed = (targetValue: typeof Currency[0]) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)} 🤑`;
      SetResultValue(result);
      SetTargetCurrency(targetValue.name);
    } else {
      return Snackbar.show({
        text: 'Not a valid number to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#333333" />
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              onChangeText={SetInputValue}
              keyboardType="number-pad"
              placeholder="Enter amount in Rs"
              placeholderTextColor="#888"
              style={styles.inputAmountField}
            />
          </View>
          {resultValue && <Text style={styles.resultTxt}>{resultValue}</Text>}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={3}
            data={Currency}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <Pressable
                style={[
                  styles.button,
                  targetCurrency === item.name && styles.selected,
                ]}
                onPress={() => buttonPressed(item)}>
                <Text style={styles.buttonText}>
                  {item.flag} {item.name}
                </Text>
              </Pressable>
            )}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#333333',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444444',
    borderRadius: 8,
    padding: 8,
    marginBottom: 20,
  },
  rupee: {
    marginRight: 8,
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#888888',
    backgroundColor: '#FFFFFF',
    color: '#000',
  },
  resultTxt: {
    fontSize: 28,
    color: '#4db8ff',
    fontWeight: '800',
  },
  bottomContainer: {
    flex: 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1c1c1c',
  },
  flatListContent: {
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    margin: 8,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#3b3b3b',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: '#4db8ff',
    elevation: 4,
  },
});

export default App;
