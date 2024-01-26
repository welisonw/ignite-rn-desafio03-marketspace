import { useState } from 'react';
import { FormControl, useTheme } from 'native-base';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

interface PhoneInputProps extends TextInputMaskProps {
	errorMessage?: string | null;
	isInvalid?: boolean | undefined;
}

export const PhoneInput = ({
	errorMessage = null,
	isInvalid,
	...props
}: PhoneInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

	const { colors, fonts, fontSizes, radii } = useTheme();

	const isInvalidInput = !!errorMessage || isInvalid;

	return (
		<FormControl isInvalid={isInvalidInput}>
			<TextInputMask
				keyboardType='phone-pad'
				options={{
					maskType: 'BRL',
					withDDD: true,
					dddMask: '+55 (99) ',
				}}
				style={[
          {
            padding: 16,
            fontFamily: fonts.body,
            fontSize: fontSizes.md,
            backgroundColor: colors.gray[100],
            color: colors.gray[600],
            borderRadius: radii.md,
          },
					isInvalidInput && { borderWidth: 1, borderColor: colors.red[500] },
          isFocused && {
            borderWidth: 1, borderColor: colors.gray[500]
          }
				]}
        placeholderTextColor={colors.gray[400]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
				{...props}
			/>

			<FormControl.ErrorMessage _text={{ color: 'red.500' }}>
				{errorMessage}
			</FormControl.ErrorMessage>
		</FormControl>
	);
};
