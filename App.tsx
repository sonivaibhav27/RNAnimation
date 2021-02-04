import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import First from "./FlatListAnim/First"
import Second from "./FlatListAnim/Second"
import Third from "./FlatListAnim/Third"
import Fourth from "./FlatListAnim/Fourth"
import Fifth from "./FlatListAnim/Fifth"
import BottomSheet from "./FlatListAnim/BottomSheet"
export default function App() {
  return (
    <View style={styles.container}>
      <BottomSheet/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
