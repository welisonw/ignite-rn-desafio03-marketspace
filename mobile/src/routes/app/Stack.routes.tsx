import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { AppTabNavigationRoutesProps, TabRoutes } from './Tabs.routes';

import { DetailsAdvertisement } from '@screens/app/DetailsAdvertisement/DetailsAdvertisement';
import { CreateOrEditAdvertisement } from '@screens/app/CreateOrEditAdvertisement/CreateOrEditAdvertisement';

type AppStackRoutes = {
  homeTab: AppTabNavigationRoutesProps;
	detailsadvertisement: {
		id: string;
	};
	createoreditadvertisement: undefined;
};

export type AppStackNavigationRoutesProps =
	NativeStackNavigationProp<AppStackRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppStackRoutes>();

export const StackRoutes = () => {
	return (
		<Navigator screenOptions={{ animation: 'ios', headerShown: false }}>
			<Screen name='homeTab' component={TabRoutes} />
			<Screen name='detailsadvertisement' component={DetailsAdvertisement} />
			<Screen
				name='createoreditadvertisement'
				component={CreateOrEditAdvertisement}
			/>
		</Navigator>
	);
};
