import React, { Component } from "react";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { View, Text, FlatList } from "react-native";
import Animated from "react-native-reanimated";

// Element => 8 * 100 => 800 / 8 =>100
const { width, height } = Dimensions.get("window");
const DATA = [
  "https://images.unsplash.com/photo-1612367197112-b10b7cae092d?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612372606404-0ab33e7187ee?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612298423159-dccda132f28d?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612299065617-f883adb67bd1?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612373958262-719771ecbb3e?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612338719480-22d91c199d62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
];

const IMAGE_WIDTH = width * 0.8;
const IMAGE_HEIGHT = height * 0.6;
const inputRangeFunc = () => {
  const ip = [];
  for (let i = 1; i <= 8; i++) {
    ip.push(width * i);
  }
  return ip;
};
const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
export default class Fourth extends Component {
  constructor(props) {
    super(props);
    this.scrollX = new Animated.Value(0);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.inputRange = inputRangeFunc();
    this.setState({ loading: false });
  }

  render() {
    const outputRange = DATA.map(
      (_, index) => (width * (index + 1)) / DATA.length
    );
    const textOutputRange = DATA.map((_, i) => i + 1);
    const moveWidth = Animated.interpolate(this.scrollX, {
      inputRange: [
        width,
        width * 2,
        width * 3,
        width * 4,
        width * 5,
        width * 6,
        width * 7,
      ],
      outputRange,
    });
    const text = Animated.interpolate(this.scrollX, {
      inputRange: [
        width,
        width * 2,
        width * 3,
        width * 4,
        width * 5,
        width * 6,
        width * 7,
      ],
      outputRange: textOutputRange,
    });
    return (
      <View>
        <View style={StyleSheet.absoluteFill}>
          {DATA.map((item, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const opacity = Animated.interpolate(this.scrollX, {
              inputRange,
              outputRange: [0, 1, 0],
            });
            const scale = Animated.interpolate(this.scrollX, {
              inputRange,
              outputRange: [0.3, 1, 0.3],
            });
            const translateY = Animated.interpolate(this.scrollX, {
              inputRange,
              outputRange: [-height, 0, height],
            });

            const borderRadius = Animated.interpolate(this.scrollX, {
              inputRange,
              outputRange: [10, 0, 10],
            });
            return (
              <Animated.Image
                blurRadius={3}
                key={`item-${index}`}
                source={{ uri: item }}
                style={[
                  StyleSheet.absoluteFill,
                  {
                    opacity,
                    transform: [{ scale }, { translateY }],
                    borderRadius,
                  },
                ]}
              />
            );
          })}
        </View>
        <View
          style={{
            position: "absolute",
            top: 50,
            left: 10,
            right: 10,
            borderRadius: 100,
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <View
            style={{
              height: 5,
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 100,
            }}
          />
          <Animated.View
            style={{
              position: "absolute",
              height: 5,
              backgroundColor: "#fff",
              width: (DATA.length * width) / (DATA.length * DATA.length) - 20,
              borderRadius: 100,
              transform: [{ translateX: moveWidth }],
            }}
          />
          <Animated.View
            style={{
              position: "absolute",
              height: 40,
              backgroundColor: "pink",
              transform: [{ translateX: moveWidth }],
              width: 40,
              top: 7,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
              💓
            </Text>
          </Animated.View>
        </View>

        <AnimatedFlatlist
          style={{
            zIndex: 10000,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.scrollX,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          snapToInterval={width}
          horizontal
          data={DATA}
          decelerationRate={0.2}
          keyExtractor={(item, index) => `item-${index}`}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width,
                  height,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: IMAGE_WIDTH,
                    height: IMAGE_HEIGHT,
                    borderRadius: 10,
                  }}
                  source={{ uri: item }}
                />
              </View>
            );
          }}
        />
      </View>
    );
  }
}
