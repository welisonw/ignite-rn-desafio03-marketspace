import { Text, View } from 'native-base';

const colorMap = {
	blueLight: 'blue.300',
	blueDark: 'blue.500',
	grayLight: 'gray.300',
	grayDark: 'gray.600',
};

interface ProductConditionTagProps {
	isNew: boolean;
	variantBgColor: keyof typeof colorMap;
}

export const ProductConditionTag = ({
	isNew,
	variantBgColor,
}: ProductConditionTagProps) => {
	return (
		<View
			px={2}
			py={'2px'}
			rounded='full'
			backgroundColor={
				isNew && variantBgColor === 'blueDark'
					? colorMap[variantBgColor]
					: isNew && variantBgColor === 'blueLight'
					? colorMap[variantBgColor]
					: !isNew && variantBgColor === 'grayDark'
					? colorMap[variantBgColor]
					: !isNew && variantBgColor === 'grayLight'
					? colorMap[variantBgColor]
					: colorMap['grayLight']
			}
		>
			<Text
				fontFamily='heading'
				fontSize='10px'
				color={variantBgColor === 'grayLight' ? 'gray.700' : 'white'}
			>
				{isNew ? 'NOVO' : 'USADO'}
			</Text>
		</View>
	);
};
