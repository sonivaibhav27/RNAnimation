import React from "react";
import { StyleSheet, TextInput, Vibration } from "react-native";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated as RNAnimanation,
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const { width, height } = Dimensions.get("window");
const colors = {
  black: "#323F4E",
  red: "#F76A6A",
  text: "#ffffff",
};

const timers = [...Array(10).keys()].map((item, index) =>
  index === 0 ? 1 : index * 5
);

const item_size = width * 0.3;

const CountDown = ({ params }) => {
  React.useEffect(() => {
    for (let i = 0; i < 5000; i++) {
      console.log("Calling");
    }
  }, []);
  const scrollX = React.useRef(new RNAnimanation.Value(0)).current;
  // Overlay
  const overlay = React.useRef(new RNAnimanation.Value(height)).current;

  // duration
  const [duration, setDuration] = React.useState(timers[0]);

  const buttonAnimation = React.useRef(new RNAnimanation.Value(0)).current;
  const startAnimation = () => {
    RNAnimanation.sequence([
      RNAnimanation.parallel([
        RNAnimanation.timing(buttonAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        RNAnimanation.timing(overlay, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      RNAnimanation.timing(overlay, {
        toValue: height,
        duration: duration * 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Vibration.cancel();
      Vibration.vibrate();
      RNAnimanation.timing(buttonAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const buttonOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const buttonTranslate = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });
  const flatListAnimationOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.black,
      }}
    >
      <View
        style={{
          ...StyleSheet.absoluteFill,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            fontSize: 100,
            color: "#FFF",
          }}
          editable={false}
          defaultValue={duration.toString()}
        />
      </View>
      <RNAnimanation.View
        style={{
          width,
          backgroundColor: colors.red,
          transform: [{ translateY: overlay }],
          ...StyleSheet.absoluteFill,
        }}
      />
      {/* Flatlist */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height,
          width,
        }}
      >
        <RNAnimanation.FlatList
          style={{
            opacity: flatListAnimationOpacity,
          }}
          keyExtractor={(item) => item.toString()}
          horizontal
          onScroll={RNAnimanation.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          snapToInterval={item_size}
          data={timers}
          contentContainerStyle={{
            paddingHorizontal: (width - item_size) / 2,
          }}
          onMomentumScrollEnd={(ev) => {
            // set Duration
            const index = ev.nativeEvent.contentOffset.x / item_size;
            setDuration(timers[index]);
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * item_size,
              index * item_size,
              (index + 1) * item_size,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.6, 1, 0.6],
              extrapolate: "clamp",
            });
            return (
              <RNAnimanation.View
                style={{
                  alignSelf: "center",
                  width: item_size,
                  justifyContent: "center",
                  alignItems: "center",
                  opacity,
                  transform: [{ scale }],
                }}
              >
                <Text
                  style={{
                    fontSize: 100,
                    color: colors.text,
                  }}
                >
                  {item}
                </Text>
              </RNAnimanation.View>
            );
          }}
        />
      </View>
      {/* Button  */}
      <RNAnimanation.View
        style={{
          width: 80,
          height: 80,
          borderRadius: 80,
          backgroundColor: colors.red,
          bottom: 20,
          position: "absolute",
          left: width / 2 - 40,
          opacity: buttonOpacity,
          transform: [{ translateY: buttonTranslate }],
          zIndex: 1000,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={startAnimation}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 60,
              backgroundColor: "red",
            }}
          ></View>
        </TouchableOpacity>
      </RNAnimanation.View>
    </View>
  );
};

export default CountDown;
