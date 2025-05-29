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
import { usePosts } from "../../hooks/usePosts";
import { useUsers } from "../../hooks/useUsers";
import { v4 as uuidv4 } from "uuid"; // để tạo post_id

const CreatePost: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [imageUri, setImageUri] = useState<string | undefined>();

  const { addPost } = usePosts();
  const { users } = useUsers();
  const currentUser = users[0]; // bạn có thể thay thế bằng useAuth nếu có

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    if (!currentUser) {
      Alert.alert("Lỗi", "Không xác định người dùng.");
      return;
    }

    if (!content.trim()) {
      Alert.alert("Lỗi", "Nội dung không được để trống.");
      return;
    }

    await addPost({
      post_id: uuidv4(),
      user_id: currentUser.user_id,
      title: "Bài viết mới",
      images: imageUri ? [imageUri] : [],
      video: [],
      content,
      createAt: new Date(),
      comment: [],
      likes: [],
      visibility: "public",
    });
    console.log(addPost);
    

    setContent("");
    setImageUri(undefined);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.inputTriggerNew}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="create-outline" size={20} color="#888" style={{ marginRight: 8 }} />
        <Text style={styles.inputText}>
          Bạn đang nghĩ gì, {currentUser?.name || "người dùng"}?
        </Text>
        <Ionicons name="image-outline" size={20} color="#888" style={{ marginLeft: "auto" }} />
      </TouchableOpacity>

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

          {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconButton} onPress={openImagePicker}>
              <Ionicons name="image-outline" size={24} color="#007AFF" />
              <Text style={styles.iconLabel}>Ảnh</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.postButton} onPress={handlePost}>
              <Text style={styles.postButtonText}>Đăng</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#444" />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  inputTriggerNew: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 12,
    margin: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  inputText: {
    color: "#888",
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
