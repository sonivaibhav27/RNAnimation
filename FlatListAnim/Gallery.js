import React from "react";
import {
  Text,
  View,
  StatusBar,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const data = [
  "https://images.unsplash.com/photo-1612626256889-bf7f9cd36d01?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612612822007-177f2232a0cb?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612539332814-edfd3b968e6f?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612543021178-601c061d26b5?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612586536883-93fc316e6cff?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612580672199-a19746b07693?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
];

const Image_SIZE = 100;
const Gallery = () => {
  const { width, height } = Dimensions.get("window");
  const [show, setShow] = React.useState(false);
  const [uri, setUri] = React.useState("");
  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {data.map((photo) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setShow(true);
                  setUri(photo);
                }}
                style={{ height: Image_SIZE, width: Image_SIZE }}
                key={photo}
              >
                <Image source={{ uri: photo }} style={{ flex: 1 }} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {show && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setShow(false);
            setUri("");
          }}
          style={StyleSheet.absoluteFill}
        >
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(url) => url}
            data={[uri, ...data.filter((url) => url !== uri)]}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.3)",
                  }}
                >
                  <Image
                    style={{
                      width,
                      height: height * 0.5,
                      borderWidth: 2,
                      borderColor: "#fff",
                    }}
                    source={{ uri: item }}
                  />
                </View>
              );
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Gallery;
