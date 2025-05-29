import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { Comment } from "../../data/mockData/post";
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  visible: boolean;
  onClose: () => void;
  comments: Comment[];
};

const CommentModal = ({ visible, onClose, comments }: Props) => {
  const [newComment, setNewComment] = useState("");

  const handleSendComment = () => {
    if (!newComment.trim()) return;

    console.log("Đã gửi bình luận:", newComment);
    setNewComment(""); // Xóa sau khi gửi
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bình luận ({comments.length})</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Đóng</Text>
          </TouchableOpacity>
        </View>

        {/* Danh sách bình luận */}
        <FlatList
          data={comments}
          keyExtractor={(item) => item.comment_id}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item, index }) => (
            <View style={styles.commentContainer}>
              <Image
                source={{
                  uri: `https://i.pravatar.cc/150?img=${(index % 10) + 1}`,
                }}
                style={styles.avatar}
              />
              <View style={styles.commentContent}>
                <Text style={styles.username}>Người dùng {index + 1}</Text>
                <Text style={styles.commentText}>{item.content}</Text>
                <View style={styles.commentActions}>
                  <Text style={styles.actionText}>Thích</Text>
                  <Text style={styles.actionText}>Trả lời</Text>
                  <Text style={styles.timeText}>
                    {new Date(item.createAt).toLocaleTimeString()}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />

        {/* Ô nhập bình luận + nút gửi */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Bình luận dưới tên Thanh Nhật"
            placeholderTextColor="#aaa"
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity onPress={handleSendComment}>
            <Ionicons name="send" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  closeText: {
    color: "#007AFF",
  },
  commentContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginTop: 15,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
  },
  commentText: {
    marginTop: 2,
  },
  commentActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },
  actionText: {
    fontSize: 12,
    color: "#666",
    marginRight: 10,
  },
  timeText: {
    fontSize: 12,
    color: "#999",
    marginLeft: "auto",
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#1c1c1e",
  },
  input: {
    flex: 1,
    backgroundColor: "#2c2c2e",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: "#fff",
    marginRight: 10,
  },
});

export default CommentModal;
