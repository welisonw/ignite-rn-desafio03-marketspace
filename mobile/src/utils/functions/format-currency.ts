export const formatCurrencyToBRL = (value: number) => {
	const numberFormatted = new Intl.NumberFormat('pt-BR', {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	}).format(value);

	return numberFormatted;
};

export const inputOnChangeUnformattedTextToNumber = (number: string) => {
	if (number.trim() === '') return null;

	const onlyNumber = '0000' + number.replace(/\D/g, '').slice(0, 10);

	const numberFormatted = onlyNumber.slice(0, -2) + '.' + onlyNumber.slice(-2);

	return parseFloat(numberFormatted);
};
