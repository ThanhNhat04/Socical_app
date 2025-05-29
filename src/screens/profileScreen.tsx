import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import FriendsSection from "../components/profile/FriendsSection";

const UserProfileScreen = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const posts = [
    {
      id: "1",
      title: "Bài viết đầu tiên",
      content: "Nội dung bài viết số 1...",
    },
    { id: "2", title: "Chia sẻ hôm nay", content: "Nội dung bài viết số 2..." },
  ];

  const friends = [
    {
      id: "f1",
      name: "Minh Tú",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: "f2",
      name: "Hoàng Long",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: "f3",
      name: "Mai Linh",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: "f4",
      name: "Văn Hòa",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: "f5",
      name: "Lan Chi",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    },
  ];

  const pickImage = async (
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Quyền truy cập bị từ chối");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cover Image */}
      <TouchableOpacity onPress={() => pickImage(setCoverImage)}>
        <Image
          source={{
            uri:
              coverImage ||
              "https://thumbs.dreamstime.com/b/spring-wallpaper-creating-award-winning-photograph-pic-encapsulates-timeless-beauty-tranquility-nature-351383535.jpg",
          }}
          style={styles.coverImage}
        />
        <View style={styles.editCoverIcon}>
          <MaterialIcons name="edit" size={20} color="white" />
        </View>
      </TouchableOpacity>

      {/* Avatar and Info */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={() => pickImage(setAvatar)}>
          <Image
            source={{
              uri:
                avatar ||
                "https://thumbs.dreamstime.com/b/spring-wallpaper-creating-award-winning-photograph-pic-encapsulates-timeless-beauty-tranquility-nature-351383535.jpg",
            }}
            style={styles.avatar}
          />
          <View style={styles.editAvatarIcon}>
            <MaterialIcons name="photo-camera" size={18} color="#fff" />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>Thanh Nhật</Text>
        <Text style={styles.friendsCount}>248 người bạn</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => Alert.alert("Chức năng đang phát triển")}
        >
          <Text style={styles.editButtonText}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
      </View>

      {/* Bài viết */}
      <View style={styles.postsContainer}>
        {posts.map((post) => (
          <View key={post.id} style={styles.postItem}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent}>{post.content}</Text>
          </View>
        ))}
      </View>

      {/* Bạn bè */}
      <FriendsSection friends={friends} />
    </ScrollView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  coverImage: {
    width: "100%",
    height: 200,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: -50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#eee",
  },
  name: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
  friendsCount: {
    color: "#666",
    fontSize: 14,
  },
  editButton: {
    marginTop: 8,
    backgroundColor: "#007bff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  editAvatarIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007bff",
    borderRadius: 12,
    padding: 4,
  },
  editCoverIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 6,
    borderRadius: 20,
  },
  postsContainer: {
    padding: 16,
  },
  postItem: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  postContent: {
    fontSize: 14,
    color: "#333",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
});
