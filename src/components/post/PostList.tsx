import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import PostItem from "./PostItem";
import { postData } from "../../data/mockData/mockPost";

const PostList = () => {
  const renderItem = ({ item }: { item: any }) => (
    <PostItem data={item} authorName={item.user_id} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={postData}
        keyExtractor={(item) => item.post_id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  listContent: {
    padding: 10,
  },
});

export default PostList;
