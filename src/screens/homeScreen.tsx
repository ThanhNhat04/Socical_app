import React from "react";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";
import ListItem from "../components/StoryList";
import PostList from "../components/PostList"

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.test}>
          <ListItem />
        </View>
        <PostList/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    margin: 0,
  },
  test: {
    padding: 20,
    backgroundColor: "blue",
    width: "auto",
    height: 200,
  },
});
