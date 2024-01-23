import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
	useFonts,
	Karla_400Regular,
	Karla_700Bold,
} from '@expo-google-fonts/karla';
import { NativeBaseProvider } from 'native-base';

import { Loading } from '@components/Loading/Loading';

export default function App() {
	let [fontsLoaded] = useFonts({
		Karla_400Regular,
		Karla_700Bold,
	});

	return (
		<NativeBaseProvider>
			<StatusBar style='auto' />
			{!fontsLoaded ? (
				<Text>Open up App.tsx to start working on your app!</Text>
			) : (
				<Loading />
			)}
		</NativeBaseProvider>
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
