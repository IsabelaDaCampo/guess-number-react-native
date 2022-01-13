import React, { useState } from "react";
import {  View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import HeaderText from '../components/HeaderText';
import Colors from '../constants/colors';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirm] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, '')); //ver
  }

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirm(false);
    Keyboard.dismiss();
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
      Alert.alert('Invalid number!', 'Number has to be between 1 to 99.', [{text: 'Ok', style: 'destructive', onPress: resetInputHandler}])
      return;
    } 
    setConfirm(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  }

  let confirmedOutPut;
  if(confirmed){
    confirmedOutPut = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title="Start game" onPress={() => props.onStartGame(selectedNumber)} />
      </Card>
    )
  }


  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.screen}>
        <HeaderText style={styles.title}>Start a new game!</HeaderText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a number</BodyText>
          <Input 
            style={styles.input}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Reset" color={Colors.accent} onPress={resetInputHandler} />
            </View>
            <View style={styles.button}>
              <Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler} />
            </View>
          </View>
        </Card>
        {confirmedOutPut}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold'
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 100
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  }
})

export default StartGameScreen;