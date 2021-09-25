import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatList, Image, Text, View, Dimensions } from "react-native";
import Animated from "react-native-reanimated";

const data = [
  "https://images.unsplash.com/photo-1612626256889-bf7f9cd36d01?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612612822007-177f2232a0cb?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612539332814-edfd3b968e6f?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612543021178-601c061d26b5?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612586536883-93fc316e6cff?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612580672199-a19746b07693?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612695138158-f90ac435b740?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612677558337-83d8d4054860?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1612679102824-637b0fc1b0ea?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const { width, height } = Dimensions.get("window");

// Todo : Scroll the down flatlist
const SyncFlat = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const bigFlatList = React.useRef(new Animated.Value(0)).current;
  const bigFlatRef = React.useRef();
  const smallRef = React.useRef(null);
  const scrollToActiveIndex = (index) => {
    setActiveIndex(index);
    bigFlatRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    // 80 => image size 4=>space
    if (index * 80 + 4 > width / 2) {
      smallRef?.current?.scrollToOffset({
        offset: index * 80 + 4 - width / 2 + 40,
        animated: true,
      });
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        // onScroll={Animated.event([
        //   {
        //     nativeEvent: {
        //       contentOffset: {
        //         x: bigFlatList,
        //       },
        //     },
        //   },
        // ])}
        ref={bigFlatRef}
        onMomentumScrollEnd={(e) => {
          const index = Math.floor(e.nativeEvent.contentOffset.x / width);
          scrollToActiveIndex(index);
        }}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.5}
        horizontal
        snapToInterval={width}
        keyExtractor={(item) => item}
        {...{ data }}
        renderItem={({ item }) => {
          return <Image style={{ height, width }} source={{ uri: item }} />;
        }}
      />

      <View style={{ position: "absolute", bottom: 30, left: 0, right: 0 }}>
        <FlatList
          decelerationRate={0.5}
          onMomentumScrollEnd={(e) => {}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          horizontal
          ref={smallRef}
          {...{ data }}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const borderWidth = Animated.interpolate(bigFlatList, {
              inputRange,
              outputRange: [0, 2, 0],
            });
            const scale = Animated.interpolate(bigFlatList, {
              inputRange,
              outputRange: [1, 0.8, 1],
              extrapolate: Animated.Extrapolate.CLAMP,
            });

            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  scrollToActiveIndex(index);
                }}
              >
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    marginHorizontal: 2,
                    borderWidth: index === activeIndex ? 2 : 0,
                    borderColor: "#FFF",
                    borderRadius: 15,
                  }}
                  source={{ uri: item }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default SyncFlat;
