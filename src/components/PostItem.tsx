import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

const postItem = () => {
  return (
    <View style={styles.container}>
      {/* Header post */}
      <View style={styles.headPost}>
        <View>
          <TouchableOpacity>
            <View style={styles.statusAvt}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=3" }}
                style={styles.avatar}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.userInfo}>
            <Text>name</Text>
            <Text>Time</Text>
          </View>
        </View>

        <View>
          <Text>icon</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.postText}>
        <Text>Mình đăng ảnh tuần trc vì hnay trời k đẹp cho lắm 😃</Text>
      </View>

      {/* Img */}
      <View>
        <Image
          source={{
            uri: "https://www.skyweaver.net/images/media/wallpapers/wallpaper1.jpg",
          }}
          style={styles.postImage}
        />
      </View>


      <View>
        <TouchableOpacity>
          <Text>Commnent</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  headPost: {
    flexDirection: "row",
    backgroundColor: "red",
    padding: 15,
    alignContent: "space-between",
  },
  statusAvt: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "red",
    alignItems: "center",
  },
  avatar: { width: 35, height: 35, borderRadius: 23 },
  postText: {},
  postImage: {},
  userInfo: {},
});

export default postItem;
