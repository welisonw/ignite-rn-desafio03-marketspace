import {
	createBottomTabNavigator,
	BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import { useTheme } from 'native-base';

import { Home } from '@screens/app/Home/Home';
import { MyAdvertisements } from '@screens/app/MyAdvertisements/MyAdvertisements';
import { Logout } from '@screens/app/Logout/Logout';

import { House, SignOut, Tag } from 'phosphor-react-native';

type AppTabRoutes = {
	home: undefined;
	myadvertisements: undefined;
	logout: undefined;
};

export type AppTabNavigationRoutesProps = BottomTabNavigationProp<AppTabRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppTabRoutes>();

export const TabRoutes = () => {
	const { colors, fontSizes, sizes } = useTheme();

	const ICON_SIZE = fontSizes.xl;

	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: colors.gray[600],
				tabBarInactiveTintColor: colors.gray[400],
				tabBarStyle: {
					backgroundColor: colors.gray[100],
					borderTopWidth: 0,
					paddingTop: sizes[5],
					paddingBottom: sizes[8],
				},
			}}
		>
			<Screen
				name='home'
				component={Home}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<House
							size={ICON_SIZE}
							weight={focused ? 'bold' : 'regular'}
							color={color}
						/>
					),
				}}
			/>

			<Screen
				name='myadvertisements'
				component={MyAdvertisements}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Tag
							size={ICON_SIZE}
							weight={focused ? 'bold' : 'regular'}
							color={color}
						/>
					),
				}}
			/>

			<Screen
				name='logout'
				component={Logout}
				options={{
					tabBarIcon: ({ focused }) => (
						<SignOut
							size={ICON_SIZE}
							weight={focused ? 'bold' : 'regular'}
							color={colors.red[400]}
						/>
					),
				}}
			/>
		</Navigator>
	);
};
