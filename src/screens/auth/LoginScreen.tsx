import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

type LoginProps = {
  setIsLoggedIn: (value: boolean) => void;
};

const LoginScreen: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleLogin = () => {
    if (email && password) {
      // Giả lập thành công đăng nhập
      Alert.alert("Đăng nhập thành công", `Chào ${email}`);
      setIsLoggedIn(true); // Gọi hàm để chuyển sang màn hình Home
    } else {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc",
        }}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Đăng Nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register" as never)}
        >
          <Text style={styles.registerText}> Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ForgotPassword" as never)}
        style={styles.forgotContainer}
      >
        <Text style={styles.forgotText}>Quên mật khẩu?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#333",
  },
  registerText: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "bold",
  },
  forgotContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  forgotText: {
    color: "#007BFF",
    fontSize: 14,
    fontWeight: "500",
  },
});
