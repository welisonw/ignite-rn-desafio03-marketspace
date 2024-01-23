import { extendTheme } from 'native-base';
import { colors } from './src/colors';
import { fonts } from './src/fonts';
import { fontSizes } from './src/fonts';

export const THEME = extendTheme({
	colors,
	fonts: {
		heading: fonts.Karla[700].bold,
		body: fonts.Karla[400].normal,
	},
	fontSizes,
});
