import {
	Button as ButtonNativeBase,
	HStack,
	IButtonProps,
	Text,
} from 'native-base';

interface ButtonProps extends IButtonProps {
	title: string;
	// primary = blue;  secondary = gray dark;  tertiary = gray light
	variant: 'primary' | 'secondary' | 'tertiary';
	icon?: JSX.Element;
}

export const Button = ({ title, variant, icon, ...props }: ButtonProps) => {
	return (
		<ButtonNativeBase
			padding={3}
			borderRadius='md'
			width='full'
			backgroundColor={
				variant === 'primary'
					? 'blue.300'
					: variant === 'secondary'
					? 'gray.700'
					: 'gray.300'
			}
			_pressed={{
				opacity: 0.7,
			}}
			{...props}
		>
			<HStack alignItems='center'>
				{icon}

				<Text
					fontFamily='heading'
					fontSize='sm'
					color={
						variant === 'primary' || variant === 'secondary'
							? 'gray.100'
							: 'gray.600'
					}
					marginLeft={icon ? 2 : 0}
				>
					{title}
				</Text>
			</HStack>
		</ButtonNativeBase>
	);
};
