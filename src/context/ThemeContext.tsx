import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, ThemeType } from '../utils/constants/theme';

const STORAGE_KEY = 'APP_THEME_IS_DARK';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  isDarkMode: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
  isDarkMode: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setisDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load trạng thái theme từ AsyncStorage khi app mở lại
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedTheme !== null) {
          setisDarkMode(savedTheme === 'true');
        }
      } catch (error) {
        console.error('Lỗi khi tải theme từ AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTheme();
  }, []);

  // Đổi theme và lưu vào AsyncStorage
  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setisDarkMode(newTheme);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, newTheme.toString());
    } catch (error) {
      console.error('Lỗi khi lưu theme vào AsyncStorage:', error);
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  if (loading) return null; // Đợi khi load xong

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
