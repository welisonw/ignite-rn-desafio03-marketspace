import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_STORAGE } from '@storage/storageConfig';

export const storageRemoveUser = async () => {
	await AsyncStorage.removeItem(USER_STORAGE);
};
