import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth/Auth.routes';
import { TabRoutes } from '@routes/app/Tabs.routes';


export const Routes = () => {
	return (
		<NavigationContainer>
      <TabRoutes />
		</NavigationContainer>
	);
};
