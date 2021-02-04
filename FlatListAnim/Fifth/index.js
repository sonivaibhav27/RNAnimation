import React, { Component } from "react";
import { Dimensions } from "react-native";
import { View, Text, FlatList, Image } from "react-native";
import Animated from "react-native-reanimated";
const data = [
  "https://images.unsplash.com/photo-1612367197112-b10b7cae092d?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612372606404-0ab33e7187ee?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612298423159-dccda132f28d?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612299065617-f883adb67bd1?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612373958262-719771ecbb3e?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612338719480-22d91c199d62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const { width, height } = Dimensions.get("window");
export default class Fifth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.scrollX = new Animated.Value(0);
  }

  render() {
    return (
      <View>
        <AnimatedFlatList
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: this.scrollX,
                },
              },
            },
          ])}
          pagingEnabled
          data={data}
          horizontal
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => {
            const scale = Animated.interpolate(this.scrollX, {
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ],
              outputRange: [0.4, 1, 0.4],
            });
            const rotate = Animated.interpolate(this.scrollX, {
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ],
              outputRange: [width * 0.2, 0, -width * 0.2],
            });
            return (
              <Animated.View
                style={{
                  width,
                  height,
                  transform: [{ rotateY: Animated.concat(rotate, "deg") }],
                }}
              >
                <Image style={{ flex: 1 }} source={{ uri: item }} />
              </Animated.View>
            );
          }}
        />
      </View>
    );
  }
}
