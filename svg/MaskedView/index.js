import * as React from "react"
import {View,Text,StyleSheet,Dimensions,Animated} from "react-native"
import MaskedView from "@react-native-community/masked-view";
import Svg, { Polygon } from "react-native-svg"
import { Button } from "react-native";
import { AppState } from "react-native";

const {width,height} = Dimensions.get("window")

const fromCords = {x : 0,y:height};
const toCords = {x:width,y:0};
const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const Masked = ({animated}) => {
    React.useEffect(()=>{
     const listener =  animated.addListener(v => {
          if(polygonRef?.current){
          polygonRef.current.setNativeProps({
              points:`0,0 ${v.x},${v.y} ${width},${height} 0,${height}`
          })
        }
      })

      return () => {
        animated.removeListener(listener);
      };
    })

    const animatedTranslate = animated.x.interpolate({
        inputRange:[0,width],
        outputRange:[-100,0],
        extrapolate:"clamp"
    })
     const animatedOpacity = animated.x.interpolate({
        inputRange:[0,width],
        outputRange:[0,1],
        extrapolate:"clamp"
    })
    const polygonRef = React.useRef();
    return(
        <MaskedView style={{flex:1}} maskElement={
           <Svg width={width} height={height}  style={{
               backgroundColor:"transparent"
           }}   viewBox={`0 0 ${width} ${height}`}>
            <AnimatedPolygon ref={polygonRef} fill="blue" points={`0,0 ${fromCords.x},${fromCords.y} ${width},${height} 0,${height}`}/>
           </Svg>
        } >
         
            <Animated.View style={{flex:1,backgroundColor:"black",transform:[{
                translateX:animatedTranslate
            }],opacity:animatedOpacity}}>
            <Text style={{
                fontSize:50,
                color:"blue"
            }}>Masked</Text>
            </Animated.View>
        </MaskedView>
    );
}

const App = () => {
    // ValueXY because we have x and y values here
    const animated =React.useRef(new Animated.ValueXY(fromCords)).current;
    const [current,setCurrent] = React.useState(0)
    const animate = value => {
        return Animated.timing(animated,{
            toValue:value === 1 ? toCords : fromCords,
            duration:450,
            // easing:Easing.linear,
            useNativeDriver:true
        })
    }
    const onPress = () => {
        if(current == 0){
        animate(1).start()
        setCurrent(1)
        }
        else{
            animate(0).start()
            setCurrent(0)
        }
    }
    
    return (
        <View style={styles.container}>
            <Masked animated={animated} />
            <Button title="Open" onPress={onPress} />
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"red"
    },
})

export default App;