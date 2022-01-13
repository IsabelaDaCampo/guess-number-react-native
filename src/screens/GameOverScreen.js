import React from "react";
import { View, StyleSheet, Text, Button, Image } from 'react-native';

import Colors from '../constants/colors';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>The game is over!</TitleText>
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image}
          // source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_1280.jpg'}} //imagem web
          source={require('../../assets/success.png')} //imagem local
          resizeMode="cover" //cover é o valor padrão
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>Your phone needed 
          <Text style={styles.highlight}> {props.roundsNumber} </Text>
          rounds to guess the number 
          <Text style={styles.highlight}> {props.userNumber}</Text>.
        </BodyText>
      </View>
      <Button title="NEW GAME +" onPress={props.onRestart} color={Colors.accent} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: Colors.black,
    overflow: 'hidden',
    marginVertical: 30
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer:{
    marginHorizontal: 30,
    marginVertical: 15
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultText:{
    textAlign: 'center',
    fontSize: 20
  }
});

export default GameOverScreen;