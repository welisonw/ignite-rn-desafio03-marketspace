import { useState } from 'react';
import { LogBox, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth/Auth.routes';
import {
	Center,
	Heading,
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	Text,
	VStack,
	useTheme,
	useToast,
} from 'native-base';

import LogoSVG from '@assets/logo.svg';

import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Eye, EyeClosed } from 'phosphor-react-native';
434;
import { Input } from '@components/Input/Input';
import { Button } from '@components/Button/Button';
import { useAuthContext } from '@hooks/useAuthContext';
import { AppError } from '@utils/AppError';

LogBox.ignoreLogs(['NativeBase']);

interface FormDataProps {
	email: string;
	password: string;
}

export const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);

	const navigation = useNavigation<AuthNavigatorRoutesProps>();

	const { signIn } = useAuthContext();

	const { colors } = useTheme();

	const toast = useToast();

	const signInSchema = yup.object({
		email: yup
			.string()
			.required('O campo e-mail é obrigatório.')
			.email('O campo e-mail é inválido.'),
		password: yup.string().required('O campo senha é obrigatório.'),
	});

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormDataProps>({
		resolver: yupResolver(signInSchema),
	});

	async function handleSignIn({ email, password }: FormDataProps) {
		try {
			await signIn(email, password);
		} catch (error) {
			const isAppError = error instanceof AppError;

			const title = isAppError
				? error.message
				: 'Não foi possível acessar a conta. Tente novamente mais tarde.';

			toast.show({
				title,
				placement: 'top',
				bgColor: 'red.500',
			});
		}
	}

	function handleGoRegister() {
		navigation.navigate('register');
	}

	return (
		<KeyboardAvoidingView
			flex={1}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
				scrollEnabled={false}
			>
				<VStack
					flex={1}
					alignItems='center'
					justifyContent='center'
					paddingTop={16}
					px={12}
					backgroundColor='gray.200'
					borderBottomRadius='3xl'
				>
					<Center marginBottom={20}>
						<LogoSVG />
						<Heading
							fontFamily='heading'
							fontSize='3xl'
							marginTop={4}
							color='gray.700'
						>
							marketspace
						</Heading>
						<Text fontFamily='light' fontSize='sm' color='gray.500'>
							Seu espaço de compra e venda
						</Text>
					</Center>

					<Center width='full' gap={4} marginBottom={8}>
						<Heading fontFamily='body' fontSize='sm' color='gray.600'>
							Acesse sua conta
						</Heading>

						<Controller
							control={control}
							name='email'
							render={({ field: { onChange } }) => (
								<Input
									placeholder='E-mail'
									keyboardType='email-address'
									autoCapitalize='none'
									onChangeText={onChange}
									errorMessage={errors.email?.message}
								/>
							)}
						/>

						<Controller
							control={control}
							name='password'
							render={({ field: { onChange } }) => (
								<Input
									type={showPassword ? 'text' : 'password'}
									placeholder='Senha'
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
					</Center>

					<Button
						title='Entrar'
						variant='primary'
						isLoading={isSubmitting}
						onPress={handleSubmit(handleSignIn)}
					/>
				</VStack>

				<VStack marginTop={16} marginBottom={20} px={12}>
					<Center>
						<Heading
							fontFamily='body'
							fontSize='sm'
							color='gray.600'
							marginBottom={4}
						>
							Ainda não tem acesso?
						</Heading>
					</Center>

					<Button
						title='Criar uma conta'
						variant='tertiary'
						onPress={handleGoRegister}
					/>
				</VStack>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
