import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '@screens/auth/SignIn/SignIn';
import { Register } from '@screens/auth/Register/Register';

type AuthRoutesProps = {
  signIn: undefined;
  register: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutesProps>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesProps>();

export const AuthRoutes = () => {
	return (
		<Navigator
      screenOptions={{
        animation: 'ios',
        headerShown: false,
      }}
    >
			<Screen
        name='signIn'
        component={SignIn}
      />
			<Screen
        name='register'
        component={Register}
      />
		</Navigator>
	);
};
