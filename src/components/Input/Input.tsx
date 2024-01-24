import {
	FormControl,
	IInputProps,
	Input as InputNativeBase,
} from 'native-base';

interface InputProps extends IInputProps {
	errorMessage?: string | null;
}

export const Input = ({
	errorMessage = null,
	isInvalid,
	...props
}: InputProps) => {
	const isInvalidInput = !!errorMessage || isInvalid;

	return (
		<FormControl isInvalid={isInvalidInput}>
			<InputNativeBase
				width='full'
				padding={4}
				fontFamily='body'
				fontSize='md'
				backgroundColor='gray.100'
				placeholderTextColor='gray.400'
				color='gray.600'
				borderWidth={0}
				borderRadius='md'
				_focus={{
					borderWidth: 1,
					borderColor: 'gray.500',
				}}
				_invalid={{
					borderWidth: 1,
					borderColor: 'red.500',
				}}
				isInvalid={isInvalidInput}
				{...props}
			/>

			<FormControl.ErrorMessage _text={{ color: 'red.500' }}>
				{errorMessage}
			</FormControl.ErrorMessage>
		</FormControl>
	);
};
