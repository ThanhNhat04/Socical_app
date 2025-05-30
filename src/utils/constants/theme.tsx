import { Platform } from 'react-native';

export const COLORS = {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#4CD964',
    danger: '#FF3B30',
    warning: '#FF9500',
    info: '#5AC8FA',
    light: '#F2F2F7',
    dark: '#1C1C1E',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#8E8E93',
    background: '#FFFFFF',
    text: '#000000',
};

export const FONTS = {
    regular: Platform.OS === 'ios' ? 'System' : 'Roboto',
    medium: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
    bold: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
};

export const SIZES = {
    base: 8,
    small: 12,
    font: 14,
    medium: 16,
    large: 18,
    extraLarge: 24,
};

export default {
    COLORS,
    FONTS,
    SIZES,
};


export const lightTheme = {
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  modalBackground: '#F5F5F5',
};

export const darkTheme = {
  backgroundColor: '#4F4F4F',
  textColor: '#FFFFFF',
  modalBackground: '#1E1E1E',
};

export type ThemeType = typeof lightTheme;
