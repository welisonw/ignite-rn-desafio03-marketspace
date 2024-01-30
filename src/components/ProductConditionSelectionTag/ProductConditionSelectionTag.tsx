import {
	HStack,
	IPressableProps,
	Pressable,
	Text,
	useTheme,
} from 'native-base';

import { XCircle } from 'phosphor-react-native';

enum Variant {
	BlueLight,
	BlueDark,
	GrayLight,
	GrayDark,
}

interface ProductConditionSelectionTagProps extends IPressableProps {
	variant: keyof typeof Variant;
	title: 'novo' | 'usado';
	isSelected?: boolean;
}

export const ProductConditionSelectionTag = ({
	variant,
	title,
	isSelected,
	...props
}: ProductConditionSelectionTagProps) => {
	const { colors } = useTheme();

	const colorMap = {
		BlueLight: 'blue.300',
		BlueDark: 'blue.500',
		GrayLight: 'gray.200',
		GrayDark: 'gray.600',
	};

	return (
		<Pressable
			backgroundColor={colorMap[variant]}
			rounded='full'
			isPressed={isSelected}
			_pressed={{ backgroundColor: 'blue.300' }}
			{...props}
		>
			<HStack
				alignItems='center'
				space={['6px']}
				paddingLeft={4}
				paddingRight={isSelected ? ['6px'] : 4}
				py={['6px']}
			>
				<Text
					fontFamily='heading'
					fontSize='xs'
					color={variant === 'GrayLight' && !isSelected ? 'gray.500' : 'white'}
					textTransform='uppercase'
				>
					{title}
				</Text>
				{isSelected && (
					<XCircle size={16} color={colors.gray[200]} weight='fill' />
				)}
			</HStack>
		</Pressable>
	);
};
