import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext"; 

const Header = ({ setIsLoggedIn }: { setIsLoggedIn: (value: boolean) => void }) => {
  const navigation = useNavigation<any>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const { users } = useUsers();
  const { logout } = useAuth();
  const currentUser = users[0];

  const { theme, isDarkMode, toggleTheme } = useTheme();

  const handleProfile = () => {
    setMenuVisible(false);
    navigation.navigate("Profile");
  };

  const handleToggleDarkMode = () => {
    toggleTheme();
    setMenuVisible(false);
  };

  const confirmLogout = () => {
    setLogoutVisible(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setLogoutVisible(false);
      setMenuVisible(false);
      // navigation.replace("Login");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
    }
  };

  return (
    <View style={[styles.header, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Tên Ứng Dụng</Text>

      <TouchableOpacity style={{ marginRight: 12 }}>
        <Ionicons name="notifications-outline" size={24} color={theme.textColor} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Image
          source={{
            uri: currentUser?.avatar_url || "https://placekitten.com/100/100",
          }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* Dropdown menu */}
      <Modal
        transparent
        animationType="fade"
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={[styles.dropdown, { backgroundColor: theme.modalBackground }]}>
            <TouchableOpacity onPress={handleProfile} style={styles.menuItem}>
              <Text style={[styles.menuText, { color: theme.textColor }]}>
                {currentUser?.name || "Người dùng"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleToggleDarkMode} style={styles.menuItem}>
              <Text style={[styles.menuText, { color: theme.textColor }]}>
                {isDarkMode ? "Chuyển chế độ sáng" : "Chuyển chế độ tối"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={confirmLogout} style={styles.menuItem}>
              <Text style={[styles.menuText, { color: "red" }]}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Modal xác nhận đăng xuất */}
      <Modal
        transparent
        visible={logoutVisible}
        animationType="fade"
        onRequestClose={() => setLogoutVisible(false)}
      >
        <View style={styles.logoutOverlay}>
          <View style={[styles.logoutBox, { backgroundColor: theme.modalBackground }]}>
            <Text style={[styles.logoutTitle, { color: theme.textColor }]}>
              Bạn có chắc chắn muốn đăng xuất?
            </Text>
            <View style={styles.logoutActions}>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
              >
                <Text style={{ color: "#fff" }}>Đồng ý</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLogoutVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={{ color: "#007AFF" }}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    elevation: 4,
  },
  title: {
    position: "absolute",
    left: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 60,
    paddingRight: 16,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  dropdown: {
    width: 200,
    borderRadius: 8,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
  },
  logoutOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutBox: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  logoutTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  logoutActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoutButton: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: "#eee",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
});
