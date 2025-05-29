import React, { useMemo, useState } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import PostItem from "./PostItem";
import { usePosts } from "../../../hooks/usePosts";
import { useUsers } from "../../../hooks/useUsers";
import CreatePost from "./CreatePost";

const PostList = () => {
  const { posts, refetch } = usePosts(); // cần có hàm refetch()
  const { users } = useUsers();

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
    const authorName = author ? author.name : "Người dùng";
    return (
      <PostItem
        data={item}
        authorName={authorName}
        avatarUrl={author?.avatar_url}
        userId={currentUser.user_id}
      />
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch(); // gọi lại API hoặc cập nhật từ server
    } catch (error) {
      console.log("Refresh failed", error);
    }
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedPosts}
        keyExtractor={(item) => item.post_id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<CreatePost />}
        refreshing={refreshing}
        onRefresh={onRefresh}
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







// import React, { useMemo } from "react";
// import { StyleSheet, View, FlatList } from "react-native";
// import PostItem from "./PostItem";
// import { usePosts } from "../../../hooks/usePosts";
// import { useUsers } from "../../../hooks/useUsers";
// import CreatePost from "./CreatePost";

// const PostList = () => {
//   const { posts } = usePosts();
//   const { users } = useUsers();

//   const currentUser = users[0];

//   const sortedPosts = useMemo(() => {
//     if (!currentUser) return posts;

//     return [...posts].sort((a, b) => {
//       const isAFriend = currentUser.friends.includes(a.user_id);
//       const isBFriend = currentUser.friends.includes(b.user_id);

//       if (isAFriend && !isBFriend) return -1;
//       if (!isAFriend && isBFriend) return 1;
//       return 0;
//     });
//   }, [posts, currentUser]);

//   const renderItem = ({ item }: { item: any }) => {
//     const author = users.find((user) => user.user_id === item.user_id);
//     const authorName = author ? author.name : "Người dùng";
//     return (
//       <PostItem
//         data={item}
//         authorName={authorName}
//         avatarUrl={author?.avatar_url}
//         userId={currentUser.user_id}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={sortedPosts}
//         keyExtractor={(item) => item.post_id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.listContent}
//         ListHeaderComponent={<CreatePost />}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f4f4f4",
//   },
//   listContent: {
//     padding: 10,
//   },
// });

// export default PostList;