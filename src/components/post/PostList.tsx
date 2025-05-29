// import React from "react";
// import { StyleSheet, View, FlatList } from "react-native";
// import PostItem from "./PostItem";
// import { postData } from "../../data/mockData/mockPost";

// const PostList = () => {
//   const renderItem = ({ item }: { item: any }) => (
//     <PostItem data={item} authorName={item.user_id} />
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={postData}
//         keyExtractor={(item) => item.post_id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.listContent}
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


import React, { useMemo } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import PostItem from "./PostItem";
import { usePosts } from "../../hooks/usePosts";
import { useUsers } from "../../hooks/useUsers";

const PostList = () => {
  const { posts } = usePosts();
  const { users } = useUsers();

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

  const renderItem = ({ item }: { item: any }) => (
    <PostItem data={item} authorName={item.user_id} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedPosts}
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
