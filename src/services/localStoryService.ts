import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCAL_STORIES_KEY = 'local_stories';

// // Save stories
// export const saveLocalStories = async (stories: Story[]) => {
//   await AsyncStorage.setItem(LOCAL_STORIES_KEY, JSON.stringify(stories));
// };

// // Load stories
// export const loadLocalStories = async (): Promise<Story[]> => {
//   const json = await AsyncStorage.getItem(LOCAL_STORIES_KEY);
//   return json ? JSON.parse(json) : [];
// };
