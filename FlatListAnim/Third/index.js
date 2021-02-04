import * as React from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import faker from "faker";

import Animated from "react-native-reanimated";

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      "women",
      "men",
    ])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;

const Item = AVATAR_SIZE + SPACING * 3;
export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar hidden />
      <AnimatedFlatlist
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        data={DATA}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          const inputRange = [-1, 0, index * Item, (index + 2) * Item];
          const scale = Animated.interpolate(scrollY, {
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                flexDirection: "row",
                margin: 20,
                elevation: 3,
                borderWidth: 1,
                padding: 20,
                borderRadius: 10,
                transform: [{ scale }],
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                }}
              />
              <View>
                <Text
                  style={{ color: "#333", fontSize: 18, fontWeight: "bold" }}
                >
                  {item.name}
                </Text>
                <Text style={{ fontSize: 16, color: "#666" }}>
                  {item.jobTitle}
                </Text>
                <Text style={{ color: "lightblue" }}>{item.email}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
