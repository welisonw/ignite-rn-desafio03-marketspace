import { PropsWithChildren, createContext, useEffect, useState } from 'react';

import { UserDTO } from '@dtos/UserDTO';

import { api } from '@services/api';

import { storageSaveUser } from '@storage/user/saveUser';
import { storageGetUser } from '@storage/user/getUser';
import { storageRemoveUser } from '@storage/user/removeUser';
import { storageGetAuthToken } from '@storage/authToken/getAuthToken';
import { storageSaveAuthToken } from '@storage/authToken/saveAuthToken';
import { storageRemoveAuthToken } from '@storage/authToken/removeAuthToken';

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

	async function UserAndTokenUpdate(user: UserDTO, token: string) {
		try {
			setIsLoadingUserStorageData(true);

			api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

			setUser(user);
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function signIn(email: string, password: string) {
		try {
			setIsLoadingUserStorageData(true);

			const { data } = await api.post('/sessions', { email, password });

			console.log(data);

			if (data.user && data.token) {
				UserAndTokenUpdate(data.user, data.token);

				await storageSaveUser(data.user);
				await storageSaveAuthToken(data.token);
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
      await storageRemoveAuthToken();
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
			const token = await storageGetAuthToken();

			if (userSavedInStorage && token) {
				UserAndTokenUpdate(userSavedInStorage, token);
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
