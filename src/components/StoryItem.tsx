// import React from "react";
// import { TouchableOpacity, StyleSheet, View, Image } from "react-native";
// import { Story } from "../data/post";

// type itemProp = {
//   item: Story;
//   onPress: () => void;
// };

// const ItemStory = ({ onPress, item }: itemProp) => (
//   <TouchableOpacity onPress={onPress}>
//     <View style={styles.container}>
//       <Image
//         source={{ uri: item.media_url }}
//         style={styles.media}
//         resizeMode="contain"
//       />
//     </View>
//   </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   container: {
//     width: "30%",
//     // height: "50%",
//     backgroundColor: "red",
//     borderRadius: 20,
//     overflow: "hidden",
//   },
//   media: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 20,
//   },
// });

// export default ItemStory;

// // const itemProp = (onPress: any) => (
// //   <TouchableOpacity onPress={onPress}>
// //     <View style={styles.container}>
// //       <Video
// //         source={{ uri: "https://youtu.be/FSnuF1FPSIU?si=3fDS2qt630lq59SR" }}
// //         style={styles.media} // Style cho video
// //         controls={true}
// //         resizeMode="contain" // Cách điều chỉnh kích thước video
// //         paused={false} // Video không bị dừng khi khởi động
// //       />
// //     </View>
// //   </TouchableOpacity>
// // );

import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";
import { Story } from "../data/post";

type itemProp = {
  item: Story;
  onPress: () => void;
};

const ItemStory = ({ onPress, item }: itemProp) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <View style={styles.container}>
      {item.media_url ? (
        <Image
          source={{ uri: item.media_url }}
          style={styles.media}
          resizeMode="contain"
        />
      ) : (
        <Text>No Image Available</Text>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
  },
  container: {
    width: "20%",
    height: 400,
    // aspectRatio: 1,
    backgroundColor: "red",
    borderRadius: 20,
    overflow: "hidden",
  },
  media: {
    width: "20%",
    height: "20%",
    borderRadius: 20,
  },
});

export default ItemStory;
