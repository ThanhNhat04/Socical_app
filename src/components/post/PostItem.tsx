import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Post } from "../../data/post";
import CommentModal from "./CommentModal";

type Props = {
  data?: Post;
  authorName?: string;
};

const PostItem = ({ data, authorName = "Người dùng" }: Props) => {
  if (!data || !data.createAt) {
    return null;
  }

  const [imageLoaded, setImageLoaded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setImageLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headPost}>
        <View style={styles.containerPost}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=3" }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{authorName}</Text>
            <Text style={styles.postTime}>
              {new Date(data.createAt).toLocaleString()}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Nội dung */}
      <View style={styles.postText}>
        <Text>{data.content}</Text>
      </View>

      {/* Hình ảnh lazy load */}
      <View style={styles.imageWrapper}>
        {!imageLoaded ? (
          <View style={styles.imagePlaceholder}>
            <ActivityIndicator size="large" color="#888" />
            <Text style={{ marginTop: 8, color: "#666" }}>Đang tải ảnh...</Text>
          </View>
        ) : (
          data.images[0] && (
            <Image source={{ uri: data.images[0] }} style={styles.postImage} />
          )
        )}
      </View>

      {/* Hành động */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={22}
            color={liked ? "red" : "black"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowComment(true)}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={22}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="share-social-outline" size={22} color="black" />
        </TouchableOpacity>
      </View>

      {/* Modal Bình luận */}
      <CommentModal
        visible={showComment}
        onClose={() => setShowComment(false)}
        comments={data.comment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  headPost: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerPost: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {},
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postTime: {
    fontSize: 12,
    color: "#888",
  },
  postText: {
    marginVertical: 10,
  },
  imageWrapper: {
    height: 200,
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: "50%",
  },
});

export default PostItem;
