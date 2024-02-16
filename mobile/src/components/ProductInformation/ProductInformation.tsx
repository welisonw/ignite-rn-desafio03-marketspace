import { HStack, Heading, ScrollView, Text, VStack, View } from 'native-base';

import { ProductDTO } from '@dtos/ProductDTO';

import { UserPhoto } from '@components/UserPhoto/UserPhoto';
import { ProductConditionTag } from '@components/ProductConditionTag/ProductConditionTag';
import { PaymentMethods } from '@components/PaymentMethods/PaymentMethods';

interface ProductInformationProps {
	product: Omit<ProductDTO, 'id' | 'is_active' >;
}

export const ProductInformation = ({ product }: ProductInformationProps) => {
	return (
		<ScrollView px={6}>
			<HStack space={2} marginBottom={6}>
				<UserPhoto
					source={{
						uri: 'https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg',
					}}
					alt='Foto do usuário'
					size={6}
					borderWidth={2}
					borderColor='blue.300'
				/>

				<Text fontFamily='body' fontSize='sm' color='gray.700'>
					Vendedor
				</Text>
			</HStack>

			<VStack space={2} marginBottom={6}>
				<HStack>
					<ProductConditionTag
						isNew={product.is_new}
						variantBgColor={product.is_new ? 'blueLight' : 'grayLight'}
					/>
				</HStack>

				<HStack alignItems='center' justifyContent='space-between'>
					<Heading fontFamily='heading' fontSize='lg' color='gray.700'>
						{product.name}
					</Heading>

					<HStack alignItems='baseline' space={1}>
						<Text fontFamily='heading' fontSize='sm' color='blue.300'>
							R$
						</Text>

						<Text fontFamily='heading' fontSize='lg' color='blue.300'>
							{product.price}
						</Text>
					</HStack>
				</HStack>

				<Text
					fontFamily='body'
					fontSize='sm'
					color='gray.600'
					textAlign='justify'
				>
					{product.description}
				</Text>
			</VStack>

			<VStack>
				<HStack space={2} marginBottom={4}>
					<Text fontFamily='heading' fontSize='sm' color='gray.600'>
						Aceita troca?
					</Text>

					<Text fontFamily='body' fontSize='sm' color='gray.600'>
						{product.accept_trade ? 'Sim' : 'Não'}
					</Text>
				</HStack>

				<VStack>
					<Text
						fontFamily='heading'
						fontSize='sm'
						color='gray.600'
						marginBottom={2}
					>
						Meios de pagamento:
					</Text>

					{product.payment_methods.map(payment_method => (
						<PaymentMethods
							key={payment_method.key}
							paymentMethod={payment_method}
						/>
					))}
				</VStack>
			</VStack>
		</ScrollView>
	);
};
