import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserDTO } from '@dtos/UserDTO';
import { USER_STORAGE } from '@storage/storageConfig';

export const storageGetUser = async () => {
	const storagedUser = await AsyncStorage.getItem(USER_STORAGE);

	const user: UserDTO = storagedUser ? JSON.parse(storagedUser) : {};

	return user;
};
