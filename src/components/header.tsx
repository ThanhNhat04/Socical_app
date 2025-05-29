import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation<any>();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleProfile = () => {
    setMenuVisible(false);
    navigation.navigate('Profile');
  };

  const handleToggleDarkMode = () => {
    setMenuVisible(false);
    console.log('Dark mode toggled');
    // Thêm logic toggle dark mode nếu có
  };

  return (
    <View style={styles.header}>
      {/* Logo / Tên ứng dụng */}
      <Text style={styles.title}>Tên Ứng Dụng</Text>

      {/* Icon thông báo */}
      <TouchableOpacity style={{ marginRight: 12 }}>
        <Ionicons name="notifications-outline" size={24} color="#000" />
      </TouchableOpacity>

      {/* Avatar */}
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Image
          source={{uri:"https://thumbs.dreamstime.com/b/spring-wallpaper-creating-award-winning-photograph-pic-encapsulates-timeless-beauty-tranquility-nature-351383535.jpg"}}
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
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={handleProfile} style={styles.menuItem}>
              <Text style={styles.menuText}>Thông tin người dùng</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleDarkMode} style={styles.menuItem}>
              <Text style={styles.menuText}>Chuyển chế độ tối</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    elevation: 4,
  },
  title: {
    position: 'absolute',
    left: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  dropdown: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    shadowColor: '#000',
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
    color: '#333',
  },
});
