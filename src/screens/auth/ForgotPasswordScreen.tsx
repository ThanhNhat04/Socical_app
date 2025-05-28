import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<ForgotPasswordNavigationProp>();
  const [email, setEmail] = useState('');

  const isValidEmail = (email: string) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Lỗi', 'Vui lòng nhập email.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ.');
      return;
    }

    // Giả lập gửi email
    Alert.alert(
      'Yêu cầu thành công',
      `Link khôi phục mật khẩu đã được gửi đến ${email}.`
    );
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc',
        }}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Quên Mật Khẩu</Text>
      <Text style={styles.description}>
        Nhập địa chỉ email để nhận liên kết đặt lại mật khẩu.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Gửi Yêu Cầu</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLogin}>← Quay lại đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  backToLogin: {
    color: '#007BFF',
    fontSize: 14,
    textAlign: 'center',
  },
});
