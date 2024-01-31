import { Text, View } from 'native-base';

interface ProductConditionTagProps {
	isNew: boolean;
}

export const ProductConditionTag = ({ isNew }: ProductConditionTagProps) => {
	return (
		<View
			px={2}
			py={'2px'}
			rounded='full'
			backgroundColor={isNew ? 'blue.500' : 'gray.600'}
		>
			<Text fontFamily='heading' fontSize='10px' color='white'>
				{isNew ? 'NOVO' : 'USADO'}
			</Text>
		</View>
	);
};
