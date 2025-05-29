import React from "react";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";
import PostList from "../components/post/PostList";
import CreatePost from "../components/post/CreatePost";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CreatePost />
      <PostList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    margin: 0,
  },
  story: {
    width: "100%",
    height: "25%",
  },
});
