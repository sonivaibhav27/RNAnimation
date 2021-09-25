import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import First from "./FlatListAnim/First"
import Second from "./FlatListAnim/Second"
import Third from "./FlatListAnim/Third"
import Fourth from "./FlatListAnim/Fourth"
import Fifth from "./FlatListAnim/Fifth"
import BottomSheet from "./FlatListAnim/BottomSheet"
import Gallery from "./FlatListAnim/Gallery"
import SyncFlat from "./FlatListAnim/SyncFlat"
import HeaderAnimation from "./FlatListAnim/Header"
import HeaderCopy from "./FlatListAnim/HeaderCopy"
import CountDown from "./CountDown"
import DatePicker from "./DatePicker"
import ButtonAnimation from "./ButtonAnimation"
import InstagramStories from "./InstagramStories"

// Svg 
import Svg from "./svg"
import Masked from "./svg/MaskedView"
import Teacher from "./svg/MaskedView/Teacher.js"
export default function App() {
  return (
    <View style={styles.container}>
      <Masked />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
