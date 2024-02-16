import { Linking, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HStack, Text, VStack, useTheme, useToast } from 'native-base';

import {
	ArrowLeft,
	PencilSimpleLine,
	WhatsappLogo,
} from 'phosphor-react-native';

import { CarouselComponent } from '@components/CarouselComponent/CarouselComponent';
import { ProductInformation } from '@components/ProductInformation/ProductInformation';
import { useState } from 'react';
import { ProductDTO } from '@dtos/ProductDTO';
import { Button } from '@components/Button/Button';
import { UserDTO } from '@dtos/UserDTO';

export const DetailsAdvertisement = () => {
	const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

	const sliders = [
		{
			id: '1',
			path: 'https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2014%2F0417%2Fnba_jordans1_1296x729.jpg',
			product_id: '',
		},
		{
			id: '2',
			path: 'https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2014%2F0417%2Fnba_jordans1_1296x729.jpg',
			product_id: '',
		},
		{
			id: '3',
			path: 'https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2014%2F0417%2Fnba_jordans1_1296x729.jpg',
			product_id: '',
		},
	];

	const navigation = useNavigation();

	const { colors } = useTheme();

	const toast = useToast();

	function handleGoBack() {
		navigation.goBack();
	}

	function handleGoEditAdvertisement() {
		console.log('ir para screen editar anúncio.');
	}

	async function handleContactUs() {
		const message = `Olá! Vi seu anúncio no Marketspace do produto ${product.name}. Ainda está disponível?`;

		const supportedURL = `https://wa.me/${user.tel}?text=${message}`;

		const supported = await Linking.canOpenURL(supportedURL);

		if (supported) {
			await Linking.openURL(supportedURL);
		} else {
			toast.show({
				title:
					'Não foi possível entrar em contato com o vendedor. Tente novamente mais tarde',
				placement: 'top',
				bgColor: 'red.500',
			});
		}
	}

	return (
		<VStack flex={1} backgroundColor='gray.200'>
			<VStack flex={1}>
				<HStack
					alignItems='center'
					justifyContent='space-between'
					marginTop={16}
					px={6}
				>
					<TouchableOpacity activeOpacity={0.6} onPress={handleGoBack}>
						<ArrowLeft size={24} color={colors.gray[700]} />
					</TouchableOpacity>

					<TouchableOpacity
						activeOpacity={0.6}
						onPress={handleGoEditAdvertisement}
					>
						<PencilSimpleLine size={24} color={colors.gray[700]} />
					</TouchableOpacity>
				</HStack>

				<CarouselComponent product={sliders} />

				<ProductInformation product={product} />
			</VStack>

			<HStack
				alignItems='center'
				justifyContent='space-between'
				padding={6}
				backgroundColor='gray.100'
			>
				<HStack alignItems='baseline' space={1}>
					<Text fontFamily='heading' fontSize='sm' color='blue.500'>
						R$
					</Text>

					<Text fontFamily='heading' fontSize='xl' color='blue.500'>
						{product.price}
					</Text>
				</HStack>

				<Button
					title='Entrar em contato'
					variant='primary'
					icon={
						<WhatsappLogo size={16} weight='fill' color={colors.gray[200]} />
					}
					width='container'
					onPress={handleContactUs}
				/>
			</HStack>
		</VStack>
	);
};
