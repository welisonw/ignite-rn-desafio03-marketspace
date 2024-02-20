import { HStack, Heading, Text, VStack, useTheme } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { AppStackNavigationRoutesProps } from '@routes/app/Stack.routes';

import { useAuthContext } from '@hooks/useAuthContext';

import DEFAULT_USER_PHOTO from '@assets/default-user-photo.png';

import { UserPhoto } from '@components/UserPhoto/UserPhoto';
import { Button } from '@components/Button/Button';
import { Plus } from 'phosphor-react-native';
import { api } from '@services/api';

export const HomeHeader = () => {
	const navigation = useNavigation<AppStackNavigationRoutesProps>();

	const { user } = useAuthContext();

	const { colors } = useTheme();

	function handleCreateNewAdvertisement() {
		navigation.navigate('createoreditadvertisement');
	}

	return (
		<HStack alignItems='center' marginBottom={8}>
			<UserPhoto
				source={
					user.avatar
						? { uri: `${api.defaults.baseURL}/images/${user.avatar}` }
						: DEFAULT_USER_PHOTO
				}
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
					{user.name}!
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
