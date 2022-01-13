import React from "react";
import {  View, StyleSheet, Text } from "react-native"

import Colors from '../constants/colors';
import HeaderText from '../components/HeaderText';

const Header = props => {
  return (
    <View style={styles.header}>
      <HeaderText style={styles.headerTitle}>{ props.title }</HeaderText>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'open-sans-bold'
  }
})

export default Header;
