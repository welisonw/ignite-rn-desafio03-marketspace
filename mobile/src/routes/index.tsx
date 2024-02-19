import { NavigationContainer } from '@react-navigation/native';

import { useAuthContext } from '@hooks/useAuthContext';

import { AuthRoutes } from './auth/Auth.routes';
import { StackRoutes } from './app/Stack.routes';
import { Loading } from '@components/Loading/Loading';

export const Routes = () => {
	const { isLoadingUserStorageData, user } = useAuthContext();

	if (isLoadingUserStorageData) return <Loading />;

	return (
		<NavigationContainer>
			{user.id ? <StackRoutes /> : <AuthRoutes />}
		</NavigationContainer>
	);
};
