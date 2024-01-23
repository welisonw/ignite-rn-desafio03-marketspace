import { Center, Spinner } from 'native-base';

export const Loading = () => {
	return (
		<Center flex={1}>
			<Spinner size='lg' color='blue.500' />
		</Center>
	);
};
