import React from "react";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";
import PostList from "./components/PostList";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <PostList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 1,
    margin: 0,
  },
  story: {
    width: "100%",
    height: "25%",
  },
});
