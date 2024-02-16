import { useNavigation, useRoute } from '@react-navigation/native';

import { ProductImagesDTO } from '@dtos/ProductImagesDTO';

import { HStack, Text, VStack, View } from 'native-base';

import { CarouselComponent } from '@components/CarouselComponent/CarouselComponent';
import { ProductInformation } from '@components/ProductInformation/ProductInformation';
import { PaymentMethodDTO } from '@dtos/PaymentMethodsDTO';
import { Button } from '@components/Button/Button';
import { AppStackNavigationRoutesProps } from '@routes/app/Stack.routes';

interface RouteParams {
	images: ProductImagesDTO[];
	name: string;
	description: string;
	is_new: boolean;
	price: number;
	accept_trade: boolean;
	payment_methods: PaymentMethodDTO[];
}

export const Preview = () => {
	const route = useRoute();

	const {
		images,
		name,
		description,
		is_new,
		price,
		accept_trade,
		payment_methods,
	} = route.params as RouteParams;

	const navigation = useNavigation<AppStackNavigationRoutesProps>();

	function handleGoBack() {
		navigation.goBack();
	}

	function handlePublishAdvertisement() {
		console.log('publicar anúncio');
	}

	return (
		<VStack flex={1}>
			<VStack
				alignItems='center'
				space='0.5'
				paddingTop={16}
				paddingBottom={4}
				backgroundColor='blue.300'
			>
				<Text fontFamily='heading' fontSize='md' color='gray.100'>
					Pré visualização do anúncio
				</Text>

				<Text fontFamily='body' fontSize='sm' color='gray.100'>
					É assim que seu produto vai aparecer
				</Text>
			</VStack>

			<CarouselComponent product={images} />

			<View flex={1} paddingTop={5}>
				<ProductInformation
					product={{
						name,
						description,
						is_new,
						price,
						accept_trade,
						payment_methods,
						product_images: images,
					}}
				/>
			</View>

			<HStack space={3} padding={6} backgroundColor='white'>
				<Button
					title='Voltar e editar'
					variant='tertiary'
					flex={1}
					onPress={handleGoBack}
				/>

				<Button
					title='Publicar'
					variant='primary'
					flex={1}
					onPress={handlePublishAdvertisement}
				/>
			</HStack>
		</VStack>
	);
};
