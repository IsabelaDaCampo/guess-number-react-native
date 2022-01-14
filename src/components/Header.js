import React from "react";
import {  View, StyleSheet, Text, Platform } from "react-native"

import Colors from '../constants/colors';
import TitleText from '../components/TitleText';

const Header = props => {
  return (
    <View 
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid
        })
      }}
    >
      <TitleText style={styles.headerTitle}>{ props.title }</TitleText>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0,
  },
  headerAndroid: {
    backgroundColor: Colors.primary
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? Colors.primary : Colors.white,
    fontSize: 18,
    fontFamily: 'open-sans-bold'
  }
})

export default Header;
