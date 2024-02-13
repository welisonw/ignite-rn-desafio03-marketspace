import { useNavigation } from '@react-navigation/native';
import {
  HStack,
	Heading,
	Pressable,
	Text,
	VStack,
	useTheme,
} from 'native-base';

import { AppTabNavigationRoutesProps } from '@routes/app/Tabs.routes';

import { ArrowRight, Tag } from 'phosphor-react-native';

export const CardInfoMyAdvertisements = () => {
	const { colors } = useTheme();

	const navigation = useNavigation<AppTabNavigationRoutesProps>();

	function handleGoMyAdvertisements() {
		navigation.navigate('myadvertisements');
	}

	return (
		<VStack marginBottom={8}>
			<Text fontFamily='body' fontSize='sm' color='gray.500' marginBottom={3}>
				Seus produtos anunciados para venda
			</Text>

			<HStack
				alignItems='center'
				py={3}
				paddingLeft={4}
				paddingRight={5}
				backgroundColor='#6479c71a'
				borderRadius='md'
				space={4}
			>
				<Tag size={22} color={colors.blue[500]} />

				<VStack flex={1}>
					<Heading fontFamily='heading' fontSize='lg' color='gray.600'>
						4
					</Heading>

					<Text fontFamily='body' fontSize='xs' color='gray.600'>
						anúncios ativos
					</Text>
				</VStack>

				<Pressable
					onPress={handleGoMyAdvertisements}
					_pressed={{
						opacity: 0.7,
					}}
				>
					<HStack alignItems='center' space={2}>
						<Heading fontFamily='heading' fontSize='xs' color='blue.500'>
							Meus anúncios
						</Heading>

						<ArrowRight size={16} color={colors.blue[500]} />
					</HStack>
				</Pressable>
			</HStack>
		</VStack>
	);
};
