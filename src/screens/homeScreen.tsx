import React from "react";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";
import ListItem from "../components/StoryList";
import PostList from "../components/post/PostList";
import PostItem from "../components/post/PostItem";
import LoginScreen from "../screens/auth/LoginScreen"

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.story}>
        <ListItem />
      </View>
      <PostList />
      <PostItem/>
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
