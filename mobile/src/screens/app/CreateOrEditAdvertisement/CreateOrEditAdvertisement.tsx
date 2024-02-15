import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, TouchableOpacity } from 'react-native';
import {
	FlatList,
	HStack,
	Heading,
	Image,
	Pressable,
	Radio,
	ScrollView,
	Skeleton,
	Switch,
	Text,
	VStack,
	View,
	useTheme,
} from 'native-base';

import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProductImagesDTO } from '@dtos/ProductImagesDTO';
import { PaymentMethods } from '@dtos/PaymentMethodsDTO';

import { ArrowLeft, Plus, XCircle } from 'phosphor-react-native';

import {
	formatCurrencyToBRL,
	inputOnChangeUnformattedTextToNumber,
} from '@utils/functions/format-currency';

import { Input } from '@components/Input/Input';
import { Checkbox } from '@components/Checkbox/Checkbox';
import { Button } from '@components/Button/Button';

const CreateOrEditAdvertisementSchema = yup.object({
	name: yup.string().required('O título do anúncio é obrigatório.'),
	description: yup.string().required('A descrição do anúncio é obrigatória.'),
	is_new: yup.boolean().required('A condição do produto é obrigatória.'),
	price: yup.number().required(),
	accept_trade: yup.boolean().required(),
	payment_methods: yup
		.array()
		.of(yup.string())
		.min(1, 'Selecione um meio de pagamento.')
		.required('Selecione um meio de pagamento.'),
});

type FormDataProps = yup.InferType<typeof CreateOrEditAdvertisementSchema>;

const PHOTO_SIZE = 100;

export const CreateOrEditAdvertisement = () => {
	const [images, setImages] = useState<ProductImagesDTO[]>([
		{
			id: '1',
			path: 'https://http2.mlstatic.com/tenis-tennis-nike-cortez-rojo-negro-azul-hombre-D_NQ_NP_385225-MCO25410928093_032017-F.jpg',
			product_id: '123',
		},
		{
			id: '2',
			path: 'https://http2.mlstatic.com/tenis-tennis-nike-cortez-rojo-negro-azul-hombre-D_NQ_NP_385225-MCO25410928093_032017-F.jpg',
			product_id: '123',
		},
	]);
	const [photoIsLoading, setPhotoIsLoading] = useState(false);

	const navigation = useNavigation();

	const { colors } = useTheme();

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormDataProps>({
		defaultValues: {
			is_new: true,
			accept_trade: false,
			payment_methods: PaymentMethods.map(method => method.key),
		},
		resolver: yupResolver(CreateOrEditAdvertisementSchema),
	});

	function handleGoBack() {
		navigation.goBack();
	}

	function handleRemovePhoto(id: string) {
		const photosNotRemoved = images.filter(image => image.id !== id);

		Alert.alert('Remover', 'Remover esta imagem?', [
			{
				text: 'Remover',
				onPress: () => setImages([...photosNotRemoved]),
				style: 'destructive',
			},
			{
				text: 'Cancelar',
				style: 'cancel',
			},
		]);
	}

	function handleAddPhoto() {
		console.log('add foto');
	}

	function handleGoPreviewAdvertisement({
		name,
		description,
		is_new,
		price,
		accept_trade,
		payment_methods,
	}: FormDataProps) {
		console.log(name);
		console.log(description);
		console.log(is_new);
		console.log(price);
		console.log(accept_trade);
		console.log(payment_methods);
	}

	return (
		<VStack flex={1} paddingTop={16} bgColor='gray.200'>
			<VStack flex={1} px={6}>
				<HStack
					alignItems='center'
					justifyContent='space-between'
					width='full'
					marginBottom={6}
				>
					<TouchableOpacity activeOpacity={0.6} onPress={handleGoBack}>
						<ArrowLeft size={24} color={colors.gray[700]} />
					</TouchableOpacity>

					<Heading fontFamily='heading' fontSize='lg' color='gray.700'>
						Criar anúncio
					</Heading>

					<View width={'7%'} />
				</HStack>

				<ScrollView showsVerticalScrollIndicator={false}>
					<VStack marginBottom={8}>
						<VStack space={1} marginBottom={4}>
							<Text fontFamily='heading' fontSize='md' color='gray.600'>
								Imagens
							</Text>

							<Text fontFamily='body' fontSize='sm' color='gray.500'>
								Escolha até 3 imagens para mostrar o quanto o seu produto é
								incrível!
							</Text>
						</VStack>

						<FlatList
							data={images}
							keyExtractor={item => item.id!}
							renderItem={({ item }) =>
								photoIsLoading ? (
									<Skeleton
										size={PHOTO_SIZE}
										rounded='md'
										startColor='gray.400'
										endColor='gray.300'
									/>
								) : (
									<View>
										<Image
											source={{
												uri: item.path,
											}}
											alt='Foto do produto'
											size={PHOTO_SIZE}
											rounded='md'
											position='relative'
										/>

										<TouchableOpacity
											activeOpacity={0.7}
											style={{
												position: 'absolute',
												top: 0,
												right: 0,
												padding: 2,
											}}
											onPress={() => handleRemovePhoto(item.id!)}
										>
											<XCircle
												size={16}
												weight='fill'
												color={colors.gray[600]}
											/>
										</TouchableOpacity>
									</View>
								)
							}
							contentContainerStyle={{
								gap: 8,
							}}
							ListFooterComponent={
								images.length < 3 ? (
									<Pressable
										alignItems='center'
										justifyContent='center'
										size={PHOTO_SIZE}
										rounded='md'
										backgroundColor='gray.300'
										_pressed={{
											opacity: 0.7,
										}}
										onPress={handleAddPhoto}
									>
										<Plus size={24} color={colors.gray[400]} />
									</Pressable>
								) : null
							}
							horizontal
						/>
					</VStack>

					<VStack space={4} marginBottom={8}>
						<Text fontFamily='heading' fontSize='md' color='gray.600'>
							Sobre o produto
						</Text>

						<Controller
							control={control}
							name='name'
							render={({ field: { value, onChange } }) => (
								<Input
									placeholder='Título do anúncio'
									value={value}
									onChangeText={onChange}
									errorMessage={errors.name?.message}
								/>
							)}
						/>

						<Controller
							control={control}
							name='description'
							render={({ field: { value, onChange } }) => (
								<Input
									placeholder='Descrição do anúncio'
									height={160}
									multiline
									value={value}
									onChangeText={onChange}
									errorMessage={errors.name?.message}
								/>
							)}
						/>

						<Controller
							control={control}
							name='is_new'
							render={({ field: { value, onChange } }) => (
								<Radio.Group
									name='is_new'
									accessibilityLabel='Estado do Item'
									defaultValue='true'
									value={String(value)}
									onChange={onChange}
								>
									<HStack space={5}>
										<Radio
											value='true'
											_checked={{
												borderColor: 'blue.300',
												_icon: { color: 'blue.300' },
											}}
										>
											Produto novo
										</Radio>

										<Radio
											value='false'
											_checked={{
												borderColor: 'blue.300',
												_icon: { color: 'blue.300' },
											}}
										>
											Produto usado
										</Radio>
									</HStack>
								</Radio.Group>
							)}
						/>
					</VStack>

					<VStack space={3}>
						<Text fontFamily='heading' fontSize='md' color='gray.600'>
							Venda
						</Text>

						<Controller
							control={control}
							name='price'
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder='Valor do produto'
									value={value ? formatCurrencyToBRL(value) : ''}
									onChangeText={text => {
										const number = inputOnChangeUnformattedTextToNumber(text);
										onChange(number);
									}}
									keyboardType='numeric'
									errorMessage={errors.name?.message}
									InputLeftElement={
										<Text
											fontFamily='body'
											fontSize='md'
											color='gray.700'
											marginLeft={4}
											marginRight={-2}
										>
											R$
										</Text>
									}
								/>
							)}
						/>

						<Heading fontFamily='heading' fontSize='sm' color='gray.600'>
							Aceita troca?
						</Heading>

						<Controller
							control={control}
							name='accept_trade'
							render={({ field: { onChange, value } }) => (
								<Switch
									onTrackColor='blue.300'
									value={value}
									onToggle={() => onChange(!value)}
								/>
							)}
						/>

						<View marginBottom={16}>
							<Heading
								fontFamily='heading'
								fontSize='sm'
								color='gray.600'
								marginBottom={3}
							>
								Meios de pagamento aceitos
							</Heading>

							<Controller
								control={control}
								name='payment_methods'
								render={({ field: { onChange, value } }) => (
									<View>
										{PaymentMethods.map(method => (
											<Checkbox
												key={method.key}
												value={method.key}
												label={method.name}
												isChecked={value.includes(method.key)}
												onChange={isChecked => {
													const updatedValue = isChecked
														? [...value, method.key]
														: value.filter(item => item !== method.key);
													onChange(updatedValue);
												}}
												errorMessage={errors.payment_methods?.message}
											/>
										))}
									</View>
								)}
							/>
						</View>
					</VStack>
				</ScrollView>
			</VStack>

			<HStack space={3} padding={6} backgroundColor='white'>
				<Button
					title='Cancelar'
					variant='tertiary'
					flex={1}
					onPress={handleGoBack}
				/>

				<Button
					title='Avançar'
					variant='secondary'
					flex={1}
					onPress={handleSubmit(handleGoPreviewAdvertisement)}
					isLoading={isSubmitting}
				/>
			</HStack>
		</VStack>
	);
};
