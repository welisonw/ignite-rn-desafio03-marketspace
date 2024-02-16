import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { ProductImagesDTO } from '@dtos/ProductImagesDTO';
import { PaymentMethodDTO } from '@dtos/PaymentMethodsDTO';

import { AppTabNavigationRoutesProps, TabRoutes } from './Tabs.routes';

import { DetailsAdvertisement } from '@screens/app/DetailsAdvertisement/DetailsAdvertisement';
import { CreateOrEditAdvertisement } from '@screens/app/CreateOrEditAdvertisement/CreateOrEditAdvertisement';
import { Preview } from '@screens/app/Preview/Preview';

type AppStackRoutes = {
  homeTab: AppTabNavigationRoutesProps;
	detailsadvertisement: {
		id: string;
	};
	createoreditadvertisement: undefined;
	preview: {
		images: ProductImagesDTO[];
		name: string;
		description: string;
		is_new: boolean;
		price: number;
		accept_trade: boolean;
		payment_methods: PaymentMethodDTO[];
	};
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
			<Screen name='preview' component={Preview} />
		</Navigator>
	);
};
