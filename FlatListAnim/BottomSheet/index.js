import React, { Component } from "react";
import { View, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

export default class BottomSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.translationY = new Animated.Value(0);
    this.gestureHandler = Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            translationY: this.translationY,
          },
        },
      },
    ]);
  }

  //   onHandlerStateChange = (event) => {
  //     event.nativeEvent.
  //   };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "#ccc", flex: 1 }} />
        <View style={{ flex: 1 }}>
          <PanGestureHandler
            onHandlerStateChange={this.gestureHandler}
            onGestureEvent={this.gestureHandler}
          >
            <Animated.View
              style={{
                transform: [{ translateY: this.translationY }],
                height: 300,
              }}
            >
              <Text>Hello</Text>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </View>
    );
  }
}
