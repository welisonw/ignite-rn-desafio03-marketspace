import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth/Auth.routes';
import {
	Center,
	Heading,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	VStack,
	useTheme,
	Pressable,
	View,
} from 'native-base';
import { Platform } from 'react-native';

import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LogoSVG from '@assets/logo.svg';

import { Eye, EyeClosed, PencilSimpleLine } from 'phosphor-react-native';

import { UserPhoto } from '@components/UserPhoto/UserPhoto';
import { Input } from '@components/Input/Input';
import { Button } from '@components/Button/Button';
import { PhoneInput } from '@components/PhoneInput/PhoneInput';
import { TextInputMask } from 'react-native-masked-text';

// tamanho avatar
const PHOTO_SIZE = 88;

interface FormDataProps {
	name: string;
	email: string;
	telephone: string;
	password: string;
	password_confirm: string;
}

export const Register = () => {
	const [showPassword, setShowPassword] = useState(false);

	const navigation = useNavigation<AuthNavigatorRoutesProps>();

	const { colors } = useTheme();

	const registerSchema = yup.object({
		name: yup.string().required('O campo nome é obrigatório.'),
		email: yup
			.string()
			.required('O campo e-mail é obrigatório.')
			.email('E-mail é inválido.'),
		telephone: yup
			.string()
			.required('O campo telefone é obrigatório.')
			.matches(
				/^\+\d{2} \(\d{2}\) \d{4,5}-\d{4}$/,
				'Número de telefone inválido.'
			),
		password: yup
			.string()
			.required('O campo senha é obrigatório.')
			.min(6, 'A senha deve conter no mínimo 6 dígitos'),
		password_confirm: yup
			.string()
			.required('Confirme a senha.')
			.oneOf([yup.ref('password')], 'As senhas não conferem.'),
	});

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormDataProps>({
		resolver: yupResolver(registerSchema),
	});

	function handleUserPhotoSelect() {
		console.log('selecionar foto');
	}

	function handleRegister() {
		console.log('registrado');
	}

	function handleGoSignIn() {
		navigation.navigate('signIn');
	}

	return (
		<KeyboardAvoidingView
			flex={1}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
			>
				<VStack
					flex={1}
					alignItems='center'
					justifyContent='center'
					px={12}
					paddingTop={16}
					paddingBottom={12}
					backgroundColor='gray.200'
				>
					<Center gap={3} mb={8}>
						<LogoSVG width={60} height={40} />

						<Heading
							fontFamily='heading'
							fontSize='lg'
							backgroundColor='gray.700'
						>
							Boas vindas!
						</Heading>

						<Text
							fontFamily='body'
							fontSize='sm'
							textAlign='center'
							backgroundColor='gray.600'
						>
							Crie sua conta e use o espaço para comprar itens variados e vender
							seus produtos
						</Text>
					</Center>

					<View marginBottom={4}>
						<UserPhoto
							source={{
								uri: 'https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg',
							}}
							alt='Foto do usuário'
							size={PHOTO_SIZE}
							borderWidth={3}
							borderColor='blue.300'
							position='relative'
						/>

						<Pressable
							position='absolute'
							bottom={0}
							right={-8}
							backgroundColor='blue.300'
							padding={3}
							rounded='full'
							onPress={handleUserPhotoSelect}
							_pressed={{
								backgroundColor: 'blue.500',
							}}
						>
							<PencilSimpleLine size={16} color={colors.gray[300]} />
						</Pressable>
					</View>

					<View width='full' gap={4} marginBottom={6}>
						<Controller
							control={control}
							name='name'
							render={({ field: { value, onChange } }) => (
								<Input
									placeholder='Nome'
									value={value}
									onChangeText={onChange}
									errorMessage={errors.name?.message}
								/>
							)}
						/>

						<Controller
							control={control}
							name='email'
							render={({ field: { value, onChange } }) => (
								<Input
									placeholder='E-mail'
									keyboardType='email-address'
									autoCapitalize='none'
									value={value}
									onChangeText={onChange}
									errorMessage={errors.email?.message}
								/>
							)}
						/>

						<Controller
							control={control}
							name='telephone'
							render={({ field: { value, onChange } }) => (
								<PhoneInput
									type='cel-phone'
									placeholder='Telefone'
									value={value}
									onChangeText={onChange}
									errorMessage={errors.telephone?.message}
								/>
							)}
						/>

						<Controller
							control={control}
							name='password'
							render={({ field: { value, onChange } }) => (
								<Input
									type={showPassword ? 'text' : 'password'}
									placeholder='Senha'
									value={value}
									onChangeText={onChange}
									errorMessage={errors.password?.message}
									InputRightElement={
										<Pressable
											padding={4}
											onPress={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<EyeClosed size={20} color={colors.gray[500]} />
											) : (
												<Eye size={20} color={colors.gray[500]} />
											)}
										</Pressable>
									}
								/>
							)}
						/>

						<Controller
							control={control}
							name='password_confirm'
							render={({ field: { value, onChange } }) => (
								<Input
									type={showPassword ? 'text' : 'password'}
									placeholder='Confirme a senha'
									value={value}
									onChangeText={onChange}
									errorMessage={errors.password_confirm?.message}
									returnKeyType='send'
									InputRightElement={
										<Pressable
											padding={4}
											onPress={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<EyeClosed size={20} color={colors.gray[500]} />
											) : (
												<Eye size={20} color={colors.gray[500]} />
											)}
										</Pressable>
									}
								/>
							)}
						/>
					</View>

					<Button
						title='Criar'
						variant='secondary'
						isLoading={isSubmitting}
						onPress={handleSubmit(handleRegister)}
						marginBottom={12}
					/>

					<Center>
						<Heading
							fontFamily='body'
							fontSize='sm'
							color='gray.600'
							marginBottom={4}
						>
							Já tem uma conta?
						</Heading>
					</Center>

					<Button
						title='Ir para o login'
						variant='tertiary'
						onPress={handleGoSignIn}
					/>
				</VStack>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
