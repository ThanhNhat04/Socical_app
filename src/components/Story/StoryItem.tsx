import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";
import { Story } from "../../data/mockData/post";

type itemProp = {
  item: Story;
  onPress: () => void;
};

const ItemStory = ({ onPress, item }: itemProp) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      {item.media_url ? (
        <Image
          source={{ uri: item.media_url }}
          style={styles.media}
          resizeMode="cover"
        />
      ) : (
        <Text>No Image Available</Text>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 120, 
    height: "100%",
    backgroundColor: "red",
    borderRadius: 20,
    overflow: "hidden",
    marginRight:10
  },
  media: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});

export default ItemStory;
