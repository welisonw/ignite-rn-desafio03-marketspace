import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import {
	useFonts,
	Karla_300Light,
	Karla_400Regular,
	Karla_700Bold,
} from '@expo-google-fonts/karla';
import { NativeBaseProvider } from 'native-base';
import { THEME } from 'src/tokens';

import { Loading } from '@components/Loading/Loading';
import { Routes } from '@routes/index';
import { AuthContextProvider } from '@contexts/AuthContext';

export default function App() {
	let [fontsLoaded] = useFonts({
		Karla_300Light,
		Karla_400Regular,
		Karla_700Bold,
	});

	return (
		<AuthContextProvider>
			<NativeBaseProvider theme={THEME}>
				<StatusBar style='auto' />
				{fontsLoaded ? <Routes /> : <Loading />}
			</NativeBaseProvider>
		</AuthContextProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
