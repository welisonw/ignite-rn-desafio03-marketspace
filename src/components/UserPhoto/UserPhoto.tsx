import { IImageProps, Image } from 'native-base';
import { ImageSourcePropType } from 'react-native';

interface UserPhotoProps extends IImageProps {
	source: ImageSourcePropType;
	size: number;
}

export const UserPhoto = ({ source, size, ...props }: UserPhotoProps) => {
	return (
		<Image
			source={source}
			width={size}
			height={size}
			rounded='full'
			{...props}
		/>
	);
};
