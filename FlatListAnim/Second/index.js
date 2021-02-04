import React, { Component } from "react";
import { Dimensions } from "react-native";
import { View, Text, FlatList, Image } from "react-native";
import Animated from "react-native-reanimated";
import { SecondExample } from "../First/Data";
const { width, height } = Dimensions.get("window");

// syncing two flatlist.

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
export default class Second extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.scrollX = new Animated.Value(0);
  }

  componentDidMount() {
    const data = SecondExample();
    this.setState({ data });
  }
  renderPeople = ({ item }) => {
    return <Image style={{ width, height }} source={{ uri: item }} />;
  };
  render() {
    return (
      <View>
        <AnimatedFlatList
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: this.scrollX,
                },
              },
            },
          ])}
          horizontal
          pagingEnabled
          data={this.state.data}
          renderItem={this.renderPeople}
          keyExtractor={(_, i) => i.toString()}
        />
        {/* Normal Functionaliy */}
        {/* <View style={{flexDirection:"row",justifyContent:"center",position: "absolute",
        left:0,
        right:0,
        bottom:20
    }}>
            {this.state.data.map((item,index)=>{
                const inputRange =[(index - 2)*width,(index - 1)*width,index * width,(index +1)*width,(index +2)*width]
                const opacity = Animated.interpolate(this.scrollX,{
                    inputRange,
                    outputRange:[0.2,0.2,1,0.2,0.2]
                })
                const scale = Animated.interpolate(this.scrollX,{
                    inputRange,
                    outputRange:[0.6,0.6,1.2,0.6,0.6]
                })
            
                return (
                    <Animated.View key={item} style={{height:8,width:8,borderRadius:8,backgroundColor:"#FFF",marginLeft:5,opacity,
                    transform:[{scale}]
                }} />
                )
            })}
        </View> */}
      </View>
    );
  }
}
