import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth/Auth.routes';
import { TabRoutes } from '@routes/app/Tabs.routes';
import { StackRoutes } from './app/Stack.routes';


export const Routes = () => {
	return (
		<NavigationContainer>
      <StackRoutes />
		</NavigationContainer>
	);
};
