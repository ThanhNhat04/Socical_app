// components/FriendsSection.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

interface Friend {
  id: string;
  name: string;
  avatar: string;
}

interface FriendsSectionProps {
  friends: Friend[];
}

const FriendsSection: React.FC<FriendsSectionProps> = ({ friends }) => {
  return (
    <View style={styles.friendsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Bạn bè</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Tất cả</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {friends.map((friend) => (
          <View key={friend.id} style={styles.friendItem}>
            <Image source={{ uri: friend.avatar }} style={styles.friendAvatar} />
            <Text style={styles.friendName}>{friend.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FriendsSection;

const styles = StyleSheet.create({
  friendsSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#007bff",
    fontSize: 14,
    fontWeight: "600",
  },
  friendItem: {
    marginRight: 16,
    alignItems: "center",
  },
  friendAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
  },
  friendName: {
    fontSize: 12,
    textAlign: "center",
    width: 70,
  },
});
