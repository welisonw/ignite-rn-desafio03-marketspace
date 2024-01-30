import { useState } from 'react';
import { LogBox } from 'react-native';
import {
	Divider,
	HStack,
	Pressable,
	Spinner,
	Text,
	VStack,
	useTheme,
} from 'native-base';

import { MagnifyingGlass, Sliders } from 'phosphor-react-native';

import { Input } from '@components/Input/Input';
import { ModalFilterAdvertisements } from '@components/ModalFilterAdvertisements/ModalFilterAdvertisements';

LogBox.ignoreLogs(['NativeBase']);

export const InputSearchAdvertisement = () => {
	const [isSearching, setIsSearching] = useState(false);

	const [showModal, setShowModal] = useState(false);

  console.log(showModal)
	const { colors } = useTheme();

	function handleSearch() {
		console.log('Pesquisar anúncio');
	}

	function handleOpenModal() {
		console.log('Modal aberto');
    setShowModal(true);
	}

	return (
		<VStack marginBottom={6}>
			<Text fontFamily='body' fontSize='sm' color='gray.500' marginBottom={3}>
				Seus produtos anunciados para venda
			</Text>

			<Input
				placeholder='Buscar anúncio'
				InputRightElement={
					<HStack space={3} padding={['12.5px']}>
						{isSearching ? (
							<Spinner size='sm' color={colors.gray[600]} />
						) : (
							<Pressable
								onPress={handleSearch}
								_pressed={{
									opacity: 0.5,
								}}
							>
								<MagnifyingGlass
									size={20}
									weight='bold'
									color={colors.gray[600]}
								/>
							</Pressable>
						)}

						<Divider
							orientation='vertical'
							height={18}
							backgroundColor='gray.400'
						/>

						<Pressable
							onPress={handleOpenModal}
							_pressed={{
								opacity: 0.5,
							}}
						>
							<Sliders size={20} weight='bold' color={colors.gray[600]} />
						</Pressable>
					</HStack>
				}
			/>

			{showModal && (
				<ModalFilterAdvertisements
					isOpen={showModal}
					onClose={() => setShowModal(false)}
				/>
			)}
		</VStack>
	);
};
