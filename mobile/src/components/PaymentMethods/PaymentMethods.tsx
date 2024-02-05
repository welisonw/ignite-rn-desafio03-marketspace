import { PaymentMethodDTO } from '@dtos/PaymentMethodsDTO';
import { HStack, Text, useTheme } from 'native-base';
import {
	Bank,
	Barcode,
	CreditCard,
	Money,
	QrCode,
} from 'phosphor-react-native';

interface PaymentMethodProps {
	paymentMethod: PaymentMethodDTO;
}

export const PaymentMethods = ({ paymentMethod }: PaymentMethodProps) => {
	const { colors } = useTheme();

	const colorGray = colors.gray[700];

	return (
		<HStack alignItems='center' space={2}>
			{paymentMethod.key === 'boleto' && (
				<Barcode size={18} color={colorGray} />
			)}
			{paymentMethod.key === 'pix' && <QrCode size={18} color={colorGray} />}
			{paymentMethod.key === 'cash' && <Money size={18} color={colorGray} />}
			{paymentMethod.key === 'card' && (
				<CreditCard size={18} color={colorGray} />
			)}
			{paymentMethod.key === 'boleto' && <Bank size={18} color={colorGray} />}

			<Text fontFamily='body' fontSize='sm' color='gray.600'>
				{paymentMethod.name}
			</Text>
		</HStack>
	);
};
