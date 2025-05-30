import * as FileSystem from "expo-file-system";

export const convertToBase64 = async (
  uri: string,
  mimeType: "image/jpeg" | "image/png" = "image/jpeg"
): Promise<string> => {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return `data:${mimeType};base64,${base64}`;
};

// Trả về chuỗi source để hiển thị Image
export const renderBase64Image = (base64: string): string => {
  return `data:image/jpeg;base64,${base64}`;
};