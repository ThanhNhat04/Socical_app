import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CommentModal from "./CommentModal";
import { Post } from "../../../data/post";
import { renderBase64Image } from "../../..//utils/imageUtils";

type Props = {
  data?: Post;
  authorName?: string;
  avatarUrl?: string;
  userId: string;
};

const PostItem = ({
  data,
  authorName = "Người dùng",
  avatarUrl,
  userId,
}: Props) => {
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
            source={{
              uri:
                avatarUrl ||
                "https://tapl.edu.vn/upload/2025/03/anh-mac-dinh-04.webp",
            }}
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
      {data.images && data.images[0] && (
        <View style={styles.imageWrapper}>
          {!imageLoaded ? (
            <View style={styles.imagePlaceholder}>
              <ActivityIndicator size="large" color="#888" />
              <Text style={{ marginTop: 8, color: "#666" }}>
                Đang tải ảnh...
              </Text>
            </View>
          ) : (
            <Image source={{ uri: data.images[0] }} style={styles.postImage} />
          )}
        </View>
      )}

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
        postId={data.post_id}
        userId={userId}
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
});

export default PostItem;
