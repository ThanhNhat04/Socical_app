import React, { useState, useCallback } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import PostItem from "../../homeScreen/components/PostItem";

import { usePosts } from "../../../hooks/usePosts";
import { useUsers } from "../../../hooks/useUsers";
import { useTheme } from "../../../context/ThemeContext"; 

const ProfilePostList = () => {
  const { posts, refetch } = usePosts();
  const { currentUser, users } = useUsers(); 
  const { theme } = useTheme(); 

  const [refreshing, setRefreshing] = useState(false);

  // Lọc ra bài viết của người dùng hiện tại
  const userPosts = posts.filter((post) => post.user_id === currentUser?.user_id);

  const renderItem = ({ item }: { item: any }) => {
    const author = users.find((user) => user.user_id === item.user_id);
    const authorName = author?.name ?? "Bạn";
    return (
      <PostItem
        data={item}
        authorName={authorName}
        avatarUrl={author?.avatar_url}
        userId={item.user_id}
        // userId={currentUser?.user_id}
      />
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.log("Lỗi khi làm mới bài viết cá nhân:", error);
    }
    setRefreshing(false);
  }, [refetch]);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.post_id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

export default ProfilePostList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  listContent: {
    padding: 10,
  },
});
