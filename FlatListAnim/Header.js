// Here we have to measure width and x of the item, so we will use measureLayout
// step1: import findNodeHandle from react native
// inorder to use measureLayout we have assign each elemet a ref.

import React from "react";
import { Dimensions } from "react-native";
import {
  FlatList,
  Image,
  Text,
  View,
  findNodeHandle,
  TouchableOpacity,
  Animated as RNAnimated,
} from "react-native";
import { FlatList as GSFlatlist } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const category = ["Men", "Woman", "Children", "Skullcandy", "Help"];
const data = [
  "https://images.unsplash.com/photo-1612626256889-bf7f9cd36d01?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612612822007-177f2232a0cb?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612539332814-edfd3b968e6f?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  "https://images.unsplash.com/photo-1612586536883-93fc316e6cff?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
].map((item, index) => ({
  uri: item,
  category: category[index],
  ref: React.createRef(),
}));
const AnimatedFlatList = Animated.createAnimatedComponent(GSFlatlist);

const IndicatorLine = ({ measure, scrollX }) => {
  console.log(measure);
  const inputRange = data.map((_, i) => i * width);
  const translateX = Animated.interpolate(scrollX, {
    inputRange,
    outputRange: data.map((item, index) => measure[index].x),
  });
  const widthAnimated = Animated.interpolate(scrollX, {
    inputRange,
    outputRange: data.map((item, index) => measure[index].width),
  });
  return (
    <Animated.View
      style={{
        height: 3,
        backgroundColor: "#262626",
        width: widthAnimated,
        position: "absolute",
        top: 30,
        transform: [{ translateX }],
        left: 0,
        right: 0,
      }}
    />
  );
};

const Indicator = ({ data, scrollX, onPress }) => {
  //   for:measuring layout based
  const containerRef = React.useRef();
  const [measure, setMeasure] = React.useState([]);
  React.useEffect(() => {
    let m = [];
    // measurelayout takes an 1st argument  as how to find layout , for ex: screen width,parent,etc
    // here we have to measure based on the indicator container,so create ref for parent
    data.forEach((item, index) => {
      item.ref.current.measureLayout(
        findNodeHandle(containerRef.current),
        (x, y, width, height) => {
          m.push({
            x,
            width,
          });
          if (index === data.length - 1) {
            setMeasure(m);
          }
        }
      );
    });
  }, []);
  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: "row",
        position: "absolute",
        top: 50,
        left: 0,
        right: 0,
        justifyContent: "space-evenly",
        zIndex: 1000,
      }}
    >
      {data.map((item, index) => {
        return (
          <TouchableOpacity onPress={() => onPress(index)}>
            <View ref={item.ref}>
              <Text
                key={item.category}
                style={{ color: "#262626", fontWeight: "bold", fontSize: 20 }}
              >
                {item.category}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
      {measure.length > 0 && (
        <IndicatorLine measure={measure} scrollX={scrollX} />
      )}
    </View>
  );
};
const Header = ({ params }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef();
  const onPress = (index) => {
    flatListRef.current?.scrollToOffset({
      offset: index * width,
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <AnimatedFlatList
        ref={flatListRef}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        snapToInterval={width}
        horizontal
        data={data}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image style={{ flex: 1 }} source={{ uri: item.uri }} />
            </View>
          );
        }}
      />
      <Indicator {...{ onPress }} scrollX={scrollX} data={data} />
    </View>
  );
};

export default Header;
