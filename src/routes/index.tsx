import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './Auth.routes';

export const Routes = () => {
	return (
		<NavigationContainer>
			<AuthRoutes />
		</NavigationContainer>
	);
};
