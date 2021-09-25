import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Animated as RNAnimation,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated from "react-native-reanimated";

const { width: device_width } = Dimensions.get("window");
const ButtonAnimation = ({ params }) => {
  const animate = React.useRef(new RNAnimation.Value(0)).current;
  const total = React.useRef(new RNAnimation.Value(0)).current;
  const [layoutWidth, setLayoutWidth] = React.useState(0);
  const startAnimation = () => {
    RNAnimation.timing(animate, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      RNAnimation.timing(animate, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    });
  };

  React.useEffect(() => {
    RNAnimation.timing(total, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      RNAnimation.timing(total, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    });
  }, []);

  const width = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, layoutWidth],
  });
  const backgroundColor = animate.interpolate({
    inputRange: [0, 1],
    outputRange: ["orange", "yellow"],
  });
  const backgroundColorDevice = total.interpolate({
    inputRange: [0, 1],
    outputRange: ["orange", "yellow"],
  });
  const widthTotal = total.interpolate({
    inputRange: [0, 1],
    outputRange: [0, device_width],
  });
  const translateX = total.interpolate({
    inputRange: [0, 1],
    outputRange: [0, device_width],
  });
  return (
    <View style={{ flex: 1 }}>
      <RNAnimation.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: backgroundColorDevice,
            width: widthTotal,
            zIndex: -1,
          },
        ]}
      ></RNAnimation.View>

      <RNAnimation.View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          transform: [
            {
              translateX,
            },
          ],
        }}
      >
        <View
          onLayout={(e) => {
            setLayoutWidth(e.nativeEvent.layout.width);
          }}
          style={{
            paddingHorizontal: 20,
            backgroundColor: "cyan",
            paddingVertical: 10,
            flexGrow: 0,
          }}
        >
          <TouchableOpacity
            onPress={startAnimation}
            style={{
              zIndex: 10000,
            }}
          >
            <Text>Get it!</Text>
          </TouchableOpacity>
          <RNAnimation.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor,
              width,
              zIndex: -1,
            }}
          />
        </View>
      </RNAnimation.View>
    </View>
  );
};

export default ButtonAnimation;
