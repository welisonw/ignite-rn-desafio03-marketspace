import { Dimensions } from 'react-native';
import { HStack, Image, VStack, View } from 'native-base';

import Carousel from 'react-native-reanimated-carousel';

import { ProductImagesDTO } from '@dtos/ProductImagesDTO';
import { useState } from 'react';

interface CarouselProps {
	product: ProductImagesDTO[];
}

export const CarouselComponent = ({ product }: CarouselProps) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const width = Dimensions.get('window').width;

	return (
		<VStack>
			<Carousel
				data={product}
				width={width}
				height={280}
				renderItem={({ item }) => (
					<VStack>
						<Image
							source={{ uri: item.path }}
							alt='Foto do produto anunciado'
							resizeMode='contain'
							width={width}
							height={280}
						/>
					</VStack>
				)}
				pagingEnabled
				onSnapToItem={index => setActiveIndex(index)}
			/>

			{/* Dot / Pagination */}
			<HStack position='absolute' w='full' bottom={8} px='2px' space={1}>
				{product.map((_, index) => {
					return (
						<View
							key={index}
							flex={1}
							height={1}
							rounded='full'
							backgroundColor={
								index === activeIndex ? '#f7f7f8bf' : '#F7F7F880'
							}
						/>
					);
				})}
			</HStack>
		</VStack>
	);
};
