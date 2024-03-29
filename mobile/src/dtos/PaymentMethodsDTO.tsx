export interface PaymentMethodDTO {
	key: string;
	name: string;
}

export const PaymentMethods: PaymentMethodDTO[] = [
	{
		key: 'boleto',
		name: 'Boleto',
	},
	{
		key: 'pix',
		name: 'Pix',
	},
	{
		key: 'cash',
		name: 'Dinheiro',
	},
	{
		key: 'card',
		name: 'Cartão de Crédito',
	},
	{
		key: 'deposit',
		name: 'Depósito Bancário',
	},
];
