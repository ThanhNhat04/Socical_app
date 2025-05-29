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
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useComments } from "../../../hooks/useComments";
import { useUsers } from "../../../hooks/useUsers";

type Props = {
  visible: boolean;
  onClose: () => void;
  postId: string;
  userId: string;
};

const CommentModal = ({ visible, onClose, postId, userId }: Props) => {
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const { comments, addComment, editComment, deleteComment } = useComments(postId);
  const { users } = useUsers();

  const handleSendComment = async () => {
    if (!newComment.trim()) return;

    if (editingId) {
      await editComment(editingId, newComment);
      setEditingId(null);
    } else {
      await addComment(userId, newComment);
    }

    setNewComment("");
  };

  const handleOptions = (commentId: string, content: string) => {
    Alert.alert("Tuỳ chọn", "Bạn muốn làm gì với bình luận này?", [
      { text: "Sửa", onPress: () => {
        setNewComment(content);
        setEditingId(commentId);
      }},
      { text: "Xoá", onPress: () => deleteComment(commentId), style: "destructive" },
      { text: "Huỷ", style: "cancel" },
    ]);
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
          renderItem={({ item }) => {
            const user = users.find((u) => u.user_id === item.user_id);
            const name = user?.name || "Người dùng";
            const avatar = user?.avatar_url || `https://i.pravatar.cc/150?u=${item.user_id}`;

            return (
              <View style={styles.commentContainer}>
                <Image source={{ uri: avatar }} style={styles.avatar} />
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.username}>{name}</Text>
                    {item.user_id === userId && (
                      <TouchableOpacity onPress={() => handleOptions(item.comment_id, item.content)}>
                        <Ionicons name="ellipsis-vertical" size={18} color="#666" />
                      </TouchableOpacity>
                    )}
                  </View>
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
            );
          }}
        />

        {/* Nhập bình luận */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Viết bình luận..."
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
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    fontWeight: "bold",
  },
  commentText: {
    marginTop: 2,
  },
  commentActions: {
    flexDirection: "row",
    marginTop: 5,
    gap: 10,
  },
  actionText: {
    fontSize: 12,
    color: "#666",
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
