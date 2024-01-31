import { HStack, Image, Pressable, Text, VStack, View } from 'native-base';

import { UserPhoto } from '@components/UserPhoto/UserPhoto';
import { ProductConditionTag } from '@components/ProductConditionTag/ProductConditionTag';
import { ProductDTO } from '@dtos/ProductDTO';

interface CardAdvertisementsProps {
	product: ProductDTO;
	hideAvatar: boolean;
}

export const CardAdvertisements = ({
	product,
	hideAvatar,
}: CardAdvertisementsProps) => {
	function handleGoDetailsAdvertisements(id: string) {
		console.log('ir para screen detalhes do produto', id);
	}

	return (
		<Pressable
			flex={1}
			marginBottom={6}
			onPress={() => handleGoDetailsAdvertisements(product.id)}
		>
			<View marginBottom={1}>
				<Image
					source={{
						uri: product.product_images[0].path,
					}}
					alt='Foto capa do produto anunciado'
					height={100}
					resizeMode='stretch'
					rounded='md'
				/>

				<HStack
					alignItems='flex-start'
					justifyContent='space-between'
					position='absolute'
					width='full'
					paddingTop={2}
					px={2}
				>
					{hideAvatar ? (
						''
					) : (
						<UserPhoto
							source={{
								uri: 'https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg',
							}}
							alt='Foto do usuário'
							size={6}
							borderWidth={1}
							borderColor='gray.100'
						/>
					)}

					<ProductConditionTag isNew={product.is_new} />
				</HStack>
			</View>

			{!product.is_active && (
				<View
					justifyContent='flex-end'
					position='absolute'
					bgColor='#0000007f'
					flex={1}
					width='full'
					height={100}
					padding={2}
					rounded='md'
				>
					<Text fontFamily='heading' fontSize='11px' color='gray.100'>
						ANÚNCIO DESATIVADO
					</Text>
				</View>
			)}

			<VStack>
				<Text
					fontFamily='body'
					fontSize='sm'
					color={product.is_active ? 'gray.600' : 'gray.400'}
					marginBottom={0}
				>
					{product.name}
				</Text>

				<HStack alignItems='baseline' space={1}>
					<Text
						fontFamily={product.is_active ? 'heading' : 'body'}
						fontSize='xs'
						color={product.is_active ? 'gray.700' : 'gray.400'}
					>
						R$
					</Text>

					<Text
						fontFamily={product.is_active ? 'heading' : 'body'}
						fontSize='md'
						color={product.is_active ? 'gray.700' : 'gray.400'}
					>
						{product.price}
					</Text>
				</HStack>
			</VStack>
		</Pressable>
	);
};
