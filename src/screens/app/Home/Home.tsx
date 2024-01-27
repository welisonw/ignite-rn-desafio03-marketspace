import { VStack } from 'native-base';

import { HomeHeader } from '@components/HomeHeader/HomeHeader';
import { CardInfoMyAdvertisements } from '@components/CardInfoMyAdvertisements/CardInfoMyAdvertisements';
import { InputSearchAdvertisement } from '@components/InputSearchAdvertisement/InputSearchAdvertisement';

export const Home = () => {
	return (
		<VStack flex={1} paddingTop={16} px={6} backgroundColor='gray.200'>
			<HomeHeader />

			<CardInfoMyAdvertisements />

			<InputSearchAdvertisement />
		</VStack>
	);
};
