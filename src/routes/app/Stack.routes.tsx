import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { DetailsAdvertisement } from '@screens/app/DetailsAdvertisement/DetailsAdvertisement';

type AppStackRoutes = {
	detailsadvertisement: {
		id: string;
	};
};

export type AppStackNavigationRoutesProps =
	NativeStackNavigationProp<AppStackRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppStackRoutes>();

export const StackRoutes = () => {
	return (
		<Navigator screenOptions={{ animation: 'ios', headerShown: false }}>
			<Screen name='detailsadvertisement' component={DetailsAdvertisement} />
		</Navigator>
	);
};
