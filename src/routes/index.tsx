import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth/Auth.routes';

export const Routes = () => {
	return (
		<NavigationContainer>
			<AuthRoutes />
		</NavigationContainer>
	);
};
