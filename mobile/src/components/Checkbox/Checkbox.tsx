import { Checkbox as CheckboxNativeBase, Text, useTheme } from 'native-base';

interface CheckboxProps {
	value: string;
	label: string;
	isChecked: boolean;
	onChange: (isChecked: boolean) => void;
	errorMessage?: string | null;
}

export const Checkbox = ({
	value,
	label,
	isChecked,
	onChange,
}: CheckboxProps) => {
	const { colors } = useTheme();

	return (
		<CheckboxNativeBase
			value={value}
			alignItems='center'
			marginBottom={2}
			borderColor={colors.gray[400]}
			isChecked={isChecked}
			_checked={{
				background: colors.blue[300],
				borderColor: colors.blue[300],
			}}
			onChange={() => onChange(!isChecked)}
		>
			<Text
				fontFamily='body'
				fontSize='md'
				color='gray.600'
				marginLeft={2}
				textTransform='capitalize'
			>
				{label}
			</Text>
		</CheckboxNativeBase>
	);
};
