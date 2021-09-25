import React from "react";
import { View, Text } from "react-native";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  Rect,
  Stop,
} from "react-native-svg";
export default () => {
  return (
    <View style={{ flex: 1 }}>
      <Svg fill="red">
        <Circle r={20} cx={40} cy={40} />
        <Rect
          height="200"
          width="200"
          x={30}
          y={40}
          fill={"#000"}
          rx={20}
          ry={2}
          strokeWidth="1"
          stroke="red"
          strokeDasharray="1000"
          strokeDashoffset={"ref"}
          strokeOpacity={1}
        />
        <Defs>
          <LinearGradient id="url" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset={"0%"} stopColor={"rgb(255,255,0)"} />
            <Stop offset="100%" stopColor="rgb(255,255,255)" />
          </LinearGradient>
        </Defs>
        <Ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#url)" />
        <Ellipse cx="200" cy="200" rx="85" ry="55" fill="url(#url)" />
      </Svg>
    </View>
  );
};
