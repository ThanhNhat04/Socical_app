import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const postItem = () => {
  return (
    <View style={style.container}>
      {/* Header post */}

      <View style={style.header}>
        <TouchableOpacity>
          <View style={style.statusAvt}></View>
        </TouchableOpacity>
        <View>
          <Text>a</Text>
          <Text>b</Text>
        </View>
        <View></View>
      </View>

      {/* Content */}
      <View>
        <Text>abc x y z</Text>
      </View>

      {/* Img */}
      <View></View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {},
  header: {},
  statusAvt: {
    width: "30%",
    height: "30%",
    borderRadius: 50,
    backgroundColor: "blue",
  },
});

export default postItem;
