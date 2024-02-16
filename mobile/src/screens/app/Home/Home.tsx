import { useState } from 'react';
import { FlatList, VStack } from 'native-base';

import { ProductDTO } from '@dtos/ProductDTO';

import { HomeHeader } from '@components/HomeHeader/HomeHeader';
import { CardInfoMyAdvertisements } from '@components/CardInfoMyAdvertisements/CardInfoMyAdvertisements';
import { InputSearchAdvertisement } from '@components/InputSearchAdvertisement/InputSearchAdvertisement';
import { CardAdvertisement } from '@components/CardAdvertisement/CardAdvertisement';

export const Home = () => {
	const [products, setProducts] = useState<ProductDTO[]>([
		{
			id: '1',
			name: 'Tênis Jordan',
			description: 'Tênis',
			is_new: true,
			price: 509.99,
			accept_trade: false,
			payment_methods: [{ key: 'boleto', name: 'Boleto' }],
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

	return (
		<VStack flex={1} paddingTop={16} px={6} backgroundColor='gray.200'>
			<HomeHeader />

			<CardInfoMyAdvertisements />

			<InputSearchAdvertisement />

			<FlatList
				data={products}
				keyExtractor={item => item.id}
				renderItem={({ item, index }) => (
					<CardAdvertisement product={item} hideAvatar={false} />
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
