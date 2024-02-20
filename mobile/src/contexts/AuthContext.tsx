import { PropsWithChildren, createContext, useEffect, useState } from 'react';

import { UserDTO } from '@dtos/UserDTO';

import { api } from '@services/api';
import { storageSaveUser } from '@storage/user/saveUser';
import { storageGetUser } from '@storage/user/getUser';
import { storageRemoveUser } from '@storage/user/removeUser';

interface AuthContextProps {
	user: UserDTO;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	isLoadingUserStorageData: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<UserDTO>({} as UserDTO);
	const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
		useState(true);

	async function signIn(email: string, password: string) {
		try {
			setIsLoadingUserStorageData(true);

			const { data } = await api.post('/sessions', { email, password });

			console.log(data);

			if (data.user) {
				setUser(data.user);

				storageSaveUser(data.user);
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function signOut() {
		try {
			setIsLoadingUserStorageData(true);

			setUser({} as UserDTO);

      await storageRemoveUser();
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function loadUserData() {
		try {
			setIsLoadingUserStorageData(true);

			const userSavedInStorage = await storageGetUser();

			if (userSavedInStorage) {
				setUser(userSavedInStorage);
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	useEffect(() => {
		loadUserData();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, signIn, signOut, isLoadingUserStorageData }}
		>
			{children}
		</AuthContext.Provider>
	);
};
