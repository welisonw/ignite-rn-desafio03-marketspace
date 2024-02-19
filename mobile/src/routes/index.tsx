import { NavigationContainer } from '@react-navigation/native';

import { useAuthContext } from '@hooks/useAuthContext';

import { AuthRoutes } from './auth/Auth.routes';
import { StackRoutes } from './app/Stack.routes';

export const Routes = () => {
	const { user } = useAuthContext();

	return (
		<NavigationContainer>
			{user.id ? <StackRoutes /> : <AuthRoutes />}
		</NavigationContainer>
	);
};
