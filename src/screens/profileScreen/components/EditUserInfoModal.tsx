import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { User } from "../../../data/user";
import * as ImagePicker from "expo-image-picker";
import { convertToBase64 } from "../../../utils/imageUtils"; // đã có sẵn

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (updatedData: Partial<User>) => void;
  user: User | null;
};

const EditUserInfoModal = ({ visible, onClose, onSave, user }: Props) => {
  const [editedName, setEditedName] = useState(user?.name || "");
  const [avatarBase64, setAvatarBase64] = useState<string | null>(user?.avatar_url || null);

  useEffect(() => {
    setEditedName(user?.name || "");
    setAvatarBase64(user?.avatar_url || null);
  }, [user]);

  const pickAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Cần quyền truy cập ảnh để thay đổi avatar");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const base64 = await convertToBase64(uri);
      setAvatarBase64(base64);
    }
  };

  const handleSave = () => {
    onSave({
      name: editedName,
      avatar_url: avatarBase64 || undefined,
    });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Chỉnh sửa thông tin</Text>

          {/* Avatar hiển thị */}
          <TouchableOpacity onPress={pickAvatar}>
            <Image
              source={{
                uri:
                  avatarBase64 ||
                  "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
              }}
              style={styles.avatar}
            />
            <Text style={{ color: "#007bff", marginTop: 6 }}>Đổi ảnh đại diện</Text>
          </TouchableOpacity>

          {/* Input tên */}
          <TextInput
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
            placeholder="Nhập tên mới"
          />

          {/* Nút lưu */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Lưu</Text>
          </TouchableOpacity>

          {/* Nút hủy */}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditUserInfoModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#007bff",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelText: {
    marginTop: 10,
    color: "red",
  },
});
