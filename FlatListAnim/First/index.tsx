import React, { Component } from 'react';
import { View, Text, FlatList,Dimensions, Image } from 'react-native';
import Animated from "react-native-reanimated"
import {makeMagicData} from "../First/Data"
const { width, height } = Dimensions.get("window")

const colors = ["#000","pink","yellow","orange"]
const Data = new Array(10).fill(10).map(item => ({
  key: item,
  bgColor:colors[Math.floor(Math.random() * colors.length)]
}))

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
export default class FlatListAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
    this.scrollX = new Animated.Value(0)
  }
  renderItem = ({ item, index }) => {
    // index => 2 
    // User slides => to index 3
    // 2*width 3*width 4*width
    const inputRange = [(index - 1) * width, index *width , (index + 1)*width]
    const interpolate = Animated.interpolate(this.scrollX, {
      inputRange,
      outputRange:[0.8,1,0.8]
    })
    const opacity = Animated.interpolate(this.scrollX, {
      inputRange,
      outputRange:[0.8,1,0.8]
    })

    const translateX = Animated.interpolate(this.scrollX, {
      inputRange,
      outputRange:[-width/1.5,0,width/1.5]
    })

    const rotate = Animated.interpolate(this.scrollX, {
      inputRange,
      outputRange:[30,0,-30]
    })
    const translateY = Animated.interpolate(this.scrollX,{
      inputRange,
      outputRange:[-height * 2,0,height]
    })
    return (
      <View style={{width,height,justifyContent:"center",alignItems:"center"}}>
        <Animated.View style={{
          height: height * 0.5,
          width: width*0.8,
          backgroundColor: item.bgColor,
          borderRadius: 10,
          elevation: 5,
          transform: [
            { scale: interpolate },
            // {rotate:Animated.concat(rotate,"deg")},
            {  translateY},
            {translateX}
          ],
          opacity,
        }} >
          <Image source={{uri:item.avatarUrl}} style={{flex:1,borderRadius:10}} />

          <Animated.View style={{
            position:"absolute",
            bottom:0,right:0,left:0,
            backgroundColor:"rgba(0,0,0,0.4)",
            padding:20,borderBottomStartRadius:10,
            borderBottomLeftRadius:10,
            }}>
            <Text style={{
              color:"#FFF"
            }}>{item.userName}</Text>
          </Animated.View>
        </Animated.View>
      </View>
    )
  }

  componentDidMount = () => {
    const data = makeMagicData()
    this.setState({data})
  };
  
  render() {
    return (
      <View>
        <AnimatedFlatList
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x:this.scrollX
                }
              }
            }
          ])}
          snapToAlignment="center"
          snapToInterval={width}
          decelerationRate={0.5}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          renderItem={this.renderItem} data={this.state.data}
        />
      </View>
    );
  }
}
