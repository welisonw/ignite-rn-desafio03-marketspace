import { useContext } from 'react';
import { AuthContext } from '@contexts/AuthContext';

export const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error(
			'useAuthContext precisa ser passado dentro do AuthContextProvider'
		);
	}

	return context;
};
