import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Animated,
  findNodeHandle,
  TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("screen");
const images = {
  man:
    "https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  women:
    "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  kids:
    "https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  skullcandy:
    "https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  help:
    "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef(),
}));

const Indicator = ({ measure, scrollX }) => {
  const inputRange = data.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measure.map((item) => item.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measure.map((item) => item.x),
  });
  return (
    <Animated.View
      style={{
        height: 4,
        backgroundColor: "#fff",
        width: indicatorWidth,
        transform: [
          {
            translateX,
          },
        ],
        bottom: -10,
      }}
    />
  );
};

const Tab = React.forwardRef(({ title, onItemPressed }, ref) => {
  return (
    <TouchableOpacity onPress={onItemPressed}>
      <View ref={ref}>
        <Text
          style={{
            color: "#fff",
            fontSize: 84 / data.length,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});
const Tabs = ({ data, scrollX, onItemPressed }) => {
  const containerRef = React.useRef();
  const [measure, setMeasure] = React.useState([]);
  React.useEffect(() => {
    const m = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({
            x,
            y,
            width,
            height,
          });
          if (m.length === data.length) {
            setMeasure(m);
          }
        }
      );
    });
  }, []);
  console.log(measure);
  return (
    <View
      style={{
        position: "absolute",
        top: 20,
        width,
      }}
    >
      <View
        ref={containerRef}
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {data.map((item, i) => (
          <Tab
            title={item.title}
            ref={item.ref}
            onItemPressed={() => onItemPressed(i)}
          />
        ))}
      </View>
      {measure.length > 0 && <Indicator measure={measure} scrollX={scrollX} />}
    </View>
  );
};
export default () => {
  renderItem = ({ item }) => {
    return (
      <View style={{ width, height }}>
        <Image
          style={{ flex: 1, resizeMode: "cover" }}
          source={{ uri: item.image }}
        />
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: "rgba(0,0,0,0.3)",
            },
          ]}
        />
      </View>
    );
  };
  const refs = React.useRef();
  const onItemPressed = React.useCallback((item) => {
    refs.current.scrollToOffset({
      offset: item * width,
    });
  });
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        ref={refs}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          {
            useNativeDriver: false,
          }
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      <Tabs data={data} scrollX={scrollX} onItemPressed={onItemPressed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
