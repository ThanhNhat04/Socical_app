import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { storiesData } from "../../data/mockData/mockStory";
import ItemStory from "./StoryItem";
import { Story } from "../../data/mockData/post";

const listItem = () => {
  const renderItem = ({ item }: { item: Story }) => (
    <ItemStory item={item} onPress={() => {}} />
  );
  return (
    <FlatList
      data={storiesData}
      renderItem={renderItem}
      horizontal={true}
      keyExtractor={(item) => item.story_id.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    marginTop: 30,
  },
});

export default listItem;
