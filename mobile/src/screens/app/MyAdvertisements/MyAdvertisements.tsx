import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
	Box,
	Center,
	FlatList,
	HStack,
	Heading,
	Select,
	Text,
	VStack,
	View,
	useTheme,
} from 'native-base';

import { Plus } from 'phosphor-react-native';
import { CardAdvertisement } from '@components/CardAdvertisement/CardAdvertisement';
import { ProductDTO } from '@dtos/ProductDTO';

type filteredAdvertisementsProps = 'all' | 'active' | 'inactive';

export const MyAdvertisements = () => {
	const [products, setProducts] = useState<ProductDTO[]>([
		{
			id: '1',
			name: 'Tênis Jordan',
			description: 'Tênis',
			is_new: true,
			price: 509.99,
			accept_trade: false,
			payment_methods: [{ key: 'boleto', name: 'Boleto' }],
			user_id: '123',
			user: {
				avatar: '',
				email: '',
				id: '123',
				name: 'João',
				tel: '1234567890',
			},
			is_active: true,
			product_images: [
				{
					id: '12',
					path: 'https://i0.wp.com/tecalzoshoes.com/wp-content/uploads/2020/06/JORDAN--e1592306798947.png?fit=1200%2C855&ssl=1',
					product_id: '',
				},
			],
		},
		{
			id: '2',
			name: 'Tênis',
			description: 'Tênis',
			is_new: false,
			price: 409.99,
			accept_trade: true,
			payment_methods: [{ key: 'boleto', name: 'Boleto' }],
			user_id: '123',
			user: {
				avatar: '',
				email: '',
				id: '123',
				name: 'João',
				tel: '1234567890',
			},
			is_active: true,
			product_images: [
				{
					id: '12',
					path: 'https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2014%2F0417%2Fnba_jordans1_1296x729.jpg',
					product_id: '',
				},
			],
		},
		{
			id: '3',
			name: 'Tênis Jordan',
			description: 'Tênis',
			is_new: true,
			price: 509.99,
			accept_trade: false,
			payment_methods: [{ key: 'boleto', name: 'Boleto' }],
			user_id: '123',
			user: {
				avatar: '',
				email: '',
				id: '123',
				name: 'João',
				tel: '1234567890',
			},
			is_active: true,
			product_images: [
				{
					id: '12',
					path: 'https://i0.wp.com/tecalzoshoes.com/wp-content/uploads/2020/06/JORDAN--e1592306798947.png?fit=1200%2C855&ssl=1',
					product_id: '',
				},
			],
		},
		{
			id: '4',
			name: 'Tênis',
			description: 'Tênis',
			is_new: false,
			price: 409.99,
			accept_trade: true,
			payment_methods: [{ key: 'boleto', name: 'Boleto' }],
			user_id: '123',
			user: {
				avatar: '',
				email: '',
				id: '123',
				name: 'João',
				tel: '1234567890',
			},
			is_active: false,
			product_images: [
				{
					id: '12',
					path: 'https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2014%2F0417%2Fnba_jordans1_1296x729.jpg',
					product_id: '',
				},
			],
		},
	]);

	const [filteredAdvertisements, setFilteredAdvertisement] =
		useState<filteredAdvertisementsProps>('all');

	const { colors } = useTheme();

	function handleCreateNewAdvertisement() {
		console.log('criar novo anúncio.');
	}

	return (
		<VStack flex={1} marginTop={16} px={6}>
			<HStack
				alignItems='center'
				justifyContent='space-between'
				width='full'
				marginBottom={8}
			>
				<View width={'7%'} />

				<Heading fontFamily='heading' fontSize='lg' color='gray.700'>
					Meus anúncios
				</Heading>

				<TouchableOpacity
					activeOpacity={0.6}
					onPress={handleCreateNewAdvertisement}
				>
					<Plus size={24} color={colors.gray[700]} />
				</TouchableOpacity>
			</HStack>

			<HStack alignItems='center' justifyContent='space-between' marginBottom={5}>
				<Text fontFamily='body' fontSize='sm' color='gray.600'>
					{products.length} {products.length > 1 || products.length === 0 ? 'anúncios' : 'anúncio'}
				</Text>

				<Box maxWidth={130}>
					<Select
						minWidth={111}
						px={4}
						py={3}
						borderRadius='lg'
						fontFamily='body'
						fontSize='sm'
						color='gray.700'
						accessibilityLabel='Selecione o tipo do anúncio'
						_selectedItem={{
							fontFamily: 'heading',
							color: 'gray.600',
						}}
						selectedValue={filteredAdvertisements}
						onValueChange={itemValue =>
							setFilteredAdvertisement(itemValue as filteredAdvertisementsProps)
						}
					>
						<Select.Item
							label='Todos'
							value='all'
							fontFamily='heading'
							color='gray.600'
						/>
						<Select.Item label='Ativos' value='active' />
						<Select.Item label='Inativos' value='inactive' />
					</Select>
				</Box>
			</HStack>

      <FlatList
				data={products}
				keyExtractor={item => item.id}
				renderItem={({ item, index }) => (
					<CardAdvertisement product={item} hideAvatar />
				)}
				showsVerticalScrollIndicator={false}
				numColumns={2}
				columnWrapperStyle={{
					gap: 20,
				}}
			/>
		</VStack>
	);
};
