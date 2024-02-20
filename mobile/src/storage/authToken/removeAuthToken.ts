import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN_STORAGE } from '@storage/storageConfig';

export const storageRemoveAuthToken = async () => {
	await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
};
