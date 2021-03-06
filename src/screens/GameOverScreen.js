import React from "react";
import { View, StyleSheet, Text, Image, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/colors';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
  return (
    <ScrollView>
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
        <MainButton onPress={props.onRestart}>NEW GAME 
          <Ionicons name="add" size={20} color="white" />
        </MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width / 2,
    borderWidth: 2,
    borderColor: Colors.black,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer:{
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultText:{
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20
  }
});

export default GameOverScreen;