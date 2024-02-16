import { UserDTO } from '@dtos/UserDTO';
import { api } from '@services/api';
import { PropsWithChildren, createContext, useState } from 'react';

interface AuthContextProps {
	user: UserDTO;
	signIn: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<UserDTO>({} as UserDTO);

	async function signIn(email: string, password: string) {
		try {
			const { data } = await api.post('/sessions', { email, password });

      console.log(data)

			if (data.user) {
				setUser(data.user);
			}
		} catch (error) {
			throw error;
		}
	}

	return (
		<AuthContext.Provider value={{ user, signIn }}>
			{children}
		</AuthContext.Provider>
	);
};
