import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if(randomNumber === exclude)
    return generateRandomBetween(min, max, exclude);
  else 
    return randomNumber;
}

// const renderListItem = (value, numOfRound) => ( //pra scrollview
//   <View key={value} style={styles.listItem} >
//     <BodyText>#{numOfRound}</BodyText>
//     <BodyText>{value}</BodyText>
//   </View>
// )

const renderListItem = (listLenght, itemData) => (
  <View style={styles.listItem} >
    <BodyText>#{listLenght - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
)

const GameScreen = props => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT); //bloqueia orientação em tempo real

  const initialGuess = generateRandomBetween(1, 100, props.useChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;
  
    useEffect(() => {
      const updateLayout = () => {
        setAvailableDeviceWidth(Dimensions.get('window').width);
        setAvailableDeviceHeight(Dimensions.get('window').height);
      }

      Dimensions.addEventListener('change', updateLayout);

      return () => {
        Dimensions.removeEventListener('change', updateLayout);
      }
    })

  useEffect(() => {
    if(currentGuess === userChoice){
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
      Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
      return;
    }
    if(direction === 'lower'){
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber =generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
  }

  let listContainerStyle = styles.listContainer;

  if(availableDeviceWidth < 350){
    listContainerStyle = styles.listContainerBig
  }

  if(availableDeviceHeight < 500){
    return (
      <View style={styles.screen}>
        <TitleText>Opponent's Guess</TitleText>
        <View style={styles.control}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={listContainerStyle}>
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TitleText>Opponent's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={listContainerStyle}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%'
  },
  listContainer:{
    width: Dimensions.get('window').width > 350 ? '60%' : '80%',
    flex: 1
  },
  listContainerBig: {
    flex: 1,
    width: '80%'
  },
  list:{
    flexGrow: 1,
    // alignItems: 'center', //remover pra flatlist
    justifyContent: 'flex-end'
  },
  listItem: {
    flexDirection: 'row',
    borderColor: Colors.black,
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    width: '100%'
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center',
  }
})

export default GameScreen;