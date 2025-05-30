import React, { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { usePosts } from "../../../hooks/usePosts";
import { useUsers } from "../../../hooks/useUsers";
import { v4 as uuidv4 } from "uuid";
import { Post } from "../../../data/post";
import "react-native-get-random-values";
import { convertToBase64 } from "../../../utils/imageUtils";

const CreatePost: FC<{ onPostCreated?: () => void }> = ({ onPostCreated }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [imageUri, setImageUri] = useState<string | undefined>();

  const { addPost } = usePosts();
  const { currentUser } = useUsers();

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    try {
      if (!currentUser) {
        Alert.alert("Lỗi", "Không xác định người dùng.");
        return;
      }

      if (!content.trim()) {
        Alert.alert("Lỗi", "Nội dung không được để trống.");
        return;
      }

      let base64Image: string | undefined;
      if (imageUri) {
        base64Image = await convertToBase64(imageUri); // CHUYỂN ĐỔI ẢNH
      }
      const newPost: Post = {
        post_id: uuidv4().toString(),
        user_id: currentUser.user_id,
        title: "Bài viết mới",
        images: base64Image ? [base64Image] : [],
        video: [],
        content,
        createAt: new Date(),
        userComment: [],
        likes: [],
        visibility: "public",
      };
      await addPost(newPost);
      if (onPostCreated) onPostCreated();

      Alert.alert("Bài viết đã được đăng.");
      setContent("");
      setImageUri(undefined);
      setModalVisible(false);
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error);
      Alert.alert("Không thể đăng bài viết.");
    }
  };

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: currentUser?.avatar_url || "https://via.placeholder.com/40",
            }}
            style={styles.avatar}
          />
        </View>

        <TouchableOpacity
          style={styles.statusContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.statusText}>Bạn đang nghĩ gì?</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Tạo bài viết</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Nội dung bài viết..."
            multiline
            value={content}
            onChangeText={setContent}
          />

          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          )}

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={openImagePicker}
            >
              <Ionicons name="image-outline" size={24} color="#007AFF" />
              <Text style={styles.iconLabel}>Ảnh</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.postButton} onPress={handlePost}>
              <Text style={styles.postButtonText}>Đăng</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={28} color="#444" />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 5,
  },

  avatarContainer: {
    marginRight: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  statusContainer: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    justifyContent: "center",
  },

  statusText: {
    color: "#555",
    fontSize: 14,
  },

  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  textInput: {
    minHeight: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9",
  },
  previewImage: {
    width: "100%",
    height: 200,
    marginTop: 12,
    borderRadius: 10,
  },
  actions: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconLabel: {
    marginLeft: 6,
    color: "#007AFF",
  },
  postButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 16,
  },
});
