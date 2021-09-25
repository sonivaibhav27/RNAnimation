import React from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import Animated from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const data = [
  "https://images.pexels.com/photos/2916324/pexels-photo-2916324.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/6142146/pexels-photo-6142146.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/5490234/pexels-photo-5490234.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/6598170/pexels-photo-6598170.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/5275516/pexels-photo-5275516.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/4362323/pexels-photo-4362323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const InstagramStories = ({ params }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <AnimatedFlatList
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: scrollX,
              },
            },
          },
        ])}
        pagingEnabled
        horizontal
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          const scale = Animated.interpolate(scrollX, {
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [1, 1, 1],
            extrapolate: Animated.Extrapolate.CLAMP,
          });
          const rotate = Animated.concat(
            Animated.interpolate(scrollX, {
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ],
              outputRange: [-20, 0, 20],
              extrapolate: Animated.Extrapolate.CLAMP,
            }),
            "deg"
          );
          const scaleZ = Animated.interpolate(scrollX, {
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0.9, 1, 0.9],
            extrapolate: Animated.Extrapolate.CLAMP,
          });
          return <ListItem rotate={rotate} item={item} scale={scaleZ} />;
        }}
      />
    </View>
  );
};

const ListItem = ({ item, scale, rotate }) => {
  return (
    <Animated.View
      style={[
        {
          height,
          width,
          transform: [
            {
              rotateY: rotate,
            },
            {
              perspective: 1000,
            },
          ],
        },
      ]}
    >
      <Image style={{ flex: 1 }} source={{ uri: item }} />
      <View
        style={{
          position: "absolute",
          bottom: 50,
          left: 10,
          right: 10,
        }}
      >
        <View
          style={{
            padding: 10,
            borderRadius: 100,
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ fontSize: 20, color: "#999" }}>Write a comment</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default InstagramStories;
