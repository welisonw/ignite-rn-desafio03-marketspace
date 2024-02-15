import { HStack, Heading, Text, VStack, useTheme } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { AppStackNavigationRoutesProps } from '@routes/app/Stack.routes';

import { UserPhoto } from '@components/UserPhoto/UserPhoto';
import { Button } from '@components/Button/Button';
import { Plus } from 'phosphor-react-native';

export const HomeHeader = () => {
	const navigation = useNavigation<AppStackNavigationRoutesProps>();

	const { colors } = useTheme();

	function handleCreateNewAdvertisement() {
		navigation.navigate('createoreditadvertisement');
	}

	return (
		<HStack alignItems='center' marginBottom={8}>
			<UserPhoto
				source={{
					uri: 'https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg',
				}}
				alt='Foto do usuário'
				size={45}
				borderWidth={2}
				borderColor='blue.300'
				marginRight={['10px']}
			/>

			<VStack flex={1}>
				<Text fontFamily='body' fontSize='md' color='gray.700'>
					Boas vindas,
				</Text>

				<Heading fontFamily='heading' fontSize='md' color='gray.700'>
					Usuário!
				</Heading>
			</VStack>

			<Button
				icon={<Plus size={16} color={colors.gray[200]} />}
				title='Criar anúncio'
				variant='secondary'
				width='container'
				onPress={handleCreateNewAdvertisement}
			/>
		</HStack>
	);
};
