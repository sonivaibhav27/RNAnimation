import React from "react";
import { FlatList, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const day = [...Array(31).keys()].map((item) => item + 1);

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const DatePicker = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{
          height: 200,
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <AnimatedFlatList
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollX,
                },
              },
            },
          ])}
          contentContainerStyle={{
            marginVertical: 60,
            marginBottom: 120,
            backgroundColor: "rgba(0,0,0,0.3)",
            width: "100%",
          }}
          snapToInterval={40}
          keyExtractor={(item) => item.toString()}
          data={day}
          decelerationRate={0.2}
          renderItem={({ item, index }) => {
            const inputRange = [(index - 1) * 40, index * 40, (index + 1) * 40];
            const scale = Animated.interpolate(scrollX, {
              inputRange,
              outputRange: [0.6, 1, 0.6],
              extrapolate: Animated.Extrapolate.CLAMP,
            });
            const opacity = Animated.interpolate(scrollX, {
              inputRange,
              outputRange: [0.7, 1, 0.7],
              extrapolate: Animated.Extrapolate.CLAMP,
            });
            const color = Animated.interpolateColors(scrollX, {
              inputRange,
              outputColorRange: ["#444", "#000", "#444"],
            });
            return (
              <Animated.View
                style={{
                  transform: [{ scale }],
                  alignSelf: "center",
                  opacity,
                  height: 40,
                  marginBottom: index === day.length - 1 ? 150 : 0,
                }}
              >
                <Animated.Text
                  style={{
                    fontSize: 30,
                  }}
                >
                  {item}
                </Animated.Text>
              </Animated.View>
            );
          }}
        />
        <FlatList
          style={{
            flex: 1,
          }}
          keyExtractor={(item) => item.toString()}
          data={day}
          renderItem={({ item }) => {
            return (
              <Text
                style={{
                  fontSize: 60,
                }}
              >
                {item}
              </Text>
            );
          }}
        />
      </View>
    </View>
  );
};

export default DatePicker;
