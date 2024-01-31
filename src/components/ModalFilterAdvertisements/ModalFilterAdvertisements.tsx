import {
	Modal,
	IModalProps,
	HStack,
	Heading,
	useTheme,
	Pressable,
	VStack,
	Box,
	Switch,
} from 'native-base';

import { X } from 'phosphor-react-native';

import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProductConditionSelectionTag } from '@components/ProductConditionSelectionTag/ProductConditionSelectionTag';
import { PaymentMethods } from '@dtos/PaymentMethodsDTO';
import { Button } from '@components/Button/Button';
import { Checkbox } from '@components/Checkbox/Checkbox';
import { Alert } from 'react-native';

interface FormDataProps {
	is_new: boolean;
	accept_trade: boolean;
	payment_methods: string[];
}

const modalFilterAdvertisementsSchema = yup.object({
	is_new: yup.boolean().required(),
	accept_trade: yup.boolean().required(),
	payment_methods: yup
		.array()
		.min(0, 'Selecione um meio de pagamento.')
		.required('Selecione um meio de pagamento.'),
});

export const ModalFilterAdvertisements = ({ ...props }: IModalProps) => {
	const { colors } = useTheme();

	const {
		control,
		formState: { errors, isSubmitting },
		handleSubmit,
		reset,
	} = useForm<FormDataProps>({
		defaultValues: {
			is_new: true,
			accept_trade: false,
			payment_methods: PaymentMethods.map(method => method.key),
		},
		resolver: yupResolver(modalFilterAdvertisementsSchema),
	});

	function handleResetFilters() {
		reset();
	}

	function handleApplyFilters({
		is_new,
		accept_trade,
		payment_methods,
	}: FormDataProps) {
		if (!payment_methods.length) {
			return Alert.alert(
				'Erro',
				'Selecione pelo menos um meio de pagamento para aplicar os filtros.'
			);
		}

		console.log({ is_new, accept_trade, payment_methods });
	}

	return (
		<Modal
			flex={1}
			size='full'
			safeAreaTop={true}
			animationPreset='slide'
			{...props}
		>
			<Modal.Content
				marginBottom={0}
				marginTop='auto'
				paddingTop={8}
				paddingBottom={8}
				px={6}
			>
				<HStack
					alignItems='center'
					justifyContent='space-between'
					marginBottom={6}
				>
					<Heading fontFamily='heading' fontSize='lg' color='gray.700'>
						Filtrar anúncios
					</Heading>

					<Pressable onPress={props.onClose}>
						<X size={24} color={colors.gray[400]} />
					</Pressable>
				</HStack>

				<VStack space={6}>
					<Box>
						<Heading
							fontFamily='heading'
							fontSize='sm'
							color='gray.600'
							marginBottom={3}
						>
							Condição
						</Heading>

						<Controller
							control={control}
							name='is_new'
							render={({ field: { onChange, value } }) => (
								<HStack space={2}>
									<ProductConditionSelectionTag
										title='novo'
										variant='GrayLight'
                    fontSize='xs'
										isSelected={value}
										onPress={() => onChange(true)}
									/>
									<ProductConditionSelectionTag
										title='usado'
										variant='GrayLight'
                    fontSize='xs'
										isSelected={!value}
										onPress={() => onChange(false)}
									/>
								</HStack>
							)}
						/>
					</Box>

					<Box>
						<Heading
							fontFamily='heading'
							fontSize='sm'
							color='gray.600'
							marginBottom={3}
						>
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
					</Box>

					<Box marginBottom={16}>
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
								<Box>
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
										/>
									))}
								</Box>
							)}
						/>
					</Box>

					<HStack space={3}>
						<Button
							title='Resetar filtros'
							variant='tertiary'
							flex={1}
							onPress={handleResetFilters}
						/>

						<Button
							title='Aplicar filtros'
							variant='secondary'
							flex={1}
							onPress={handleSubmit(handleApplyFilters)}
							isLoading={isSubmitting}
						/>
					</HStack>
				</VStack>
			</Modal.Content>
		</Modal>
	);
};
