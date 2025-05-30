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
import FriendsSection from "./components/FriendsSection";
import { useUsers } from "../../hooks/useUsers";
import ProfilePostList from "./components/profilePostList";
import { useTheme } from "../../context/ThemeContext";
import EditUserInfoModal from "./components/EditUserInfoModal";

const UserProfileScreen = () => {
  const { currentUser, updateUser } = useUsers();
  const [avatar, setAvatar] = useState<string | null>(
    currentUser?.avatar_url || null
  );
  const [editModalVisible, setEditModalVisible] = useState(false);

  const { theme } = useTheme();

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

  const pickAvatar = async () => {
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
      const uri = result.assets[0].uri;
      setAvatar(uri);
      if (currentUser) {
        await updateUser(currentUser.user_id, { avatar_url: uri });
      }
    }
  };

  return (
    <ScrollView style={{ backgroundColor: theme.backgroundColor }}>
      {/* Cover image dùng avatar_url */}
      <TouchableOpacity onPress={pickAvatar}>
        <Image
          source={{
            uri:
              avatar ||
              "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
          }}
          style={styles.coverImage}
        />
        <View style={styles.editCoverIcon}>
          <MaterialIcons name="edit" size={20} color="white" />
        </View>
      </TouchableOpacity>

      {/* Avatar và thông tin */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={pickAvatar}>
          <Image
            source={{
              uri:
                avatar ||
                "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
            }}
            style={styles.avatar}
          />
          <View style={styles.editAvatarIcon}>
            <MaterialIcons name="photo-camera" size={18} color="#fff" />
          </View>
        </TouchableOpacity>

        <Text style={[styles.name, { color: theme.textColor }]}>
          {currentUser?.name || "Tên người dùng"}
        </Text>
        <Text style={[styles.friendsCount, { color: theme.textColor }]}>
          248 người bạn
        </Text>

        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: "#63B8FF" }]}
          onPress={() => setEditModalVisible(true)}
        >
          <Text
            style={[styles.editButtonText, { color: theme.backgroundColor }]}
          >
            Chỉnh sửa thông tin
          </Text>
        </TouchableOpacity>

        <EditUserInfoModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          onSave={async (updatedData) => {
            if (currentUser) {
              await updateUser(currentUser.user_id, updatedData);
            }
          }}
          user={currentUser}
        />
      </View>

      <FriendsSection friends={friends} />
      <ProfilePostList />
    </ScrollView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 14,
  },
  editButton: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editButtonText: {
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
    backgroundColor: "rgba(54, 26, 216, 0.6)",
    padding: 6,
    borderRadius: 20,
  },
});
