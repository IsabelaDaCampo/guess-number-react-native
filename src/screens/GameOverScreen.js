import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native';

import Colors from '../constants/colors';
import BodyText from '../components/BodyText';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <BodyText>The game is over!</BodyText>
      <BodyText>Number of rounds: {props.roundsNumber} </BodyText>
      <BodyText>Number was: {props.userNumber} </BodyText>
      <Button title="NEW GAME +" onPress={props.onRestart} color={Colors.accent} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default GameOverScreen;