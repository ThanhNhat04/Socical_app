import React, { useMemo, useState, useCallback } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import PostItem from "./PostItem";
import { usePosts } from "../../../hooks/usePosts";
import { useUsers } from "../../../hooks/useUsers";
import CreatePost from "./CreatePost";
import { useTheme } from "../../../context/ThemeContext"; 

const PostList = () => {
  const { posts, refetch } = usePosts(); 
  const { users } = useUsers();
  const { theme } = useTheme(); 

  const [refreshing, setRefreshing] = useState(false);
  const currentUser = users[0];

  const sortedPosts = useMemo(() => {
    if (!currentUser) return posts;

    return [...posts].sort((a, b) => {
      const isAFriend = currentUser.friends.includes(a.user_id);
      const isBFriend = currentUser.friends.includes(b.user_id);
      if (isAFriend && !isBFriend) return -1;
      if (!isAFriend && isBFriend) return 1;
      return 0;
    });
  }, [posts, currentUser]);

  const renderItem = ({ item }: { item: any }) => {
    const author = users.find((user) => user.user_id === item.user_id);
    const authorName = author?.name ?? "Người dùng";
    return (
      <PostItem
        data={item}
        authorName={authorName}
        avatarUrl={author?.avatar_url}
        userId={currentUser?.user_id}
      />
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.log("Lỗi làm mới:", error);
    }
    setRefreshing(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <FlatList
        data={sortedPosts}
        keyExtractor={(item) => item.post_id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<CreatePost onPostCreated={refetch} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.textColor} 
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 10,
  },
});

export default PostList;
