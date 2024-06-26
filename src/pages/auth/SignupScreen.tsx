import React, { useCallback, useState } from 'react'
import {
	Keyboard,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View
} from 'react-native'
import { ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Toast from 'react-native-toast-message'
import { color } from '../../styles/color.ts'
import { RootStackParam } from '../../utils/RootStackParam.ts'
import { postSignup } from '../../apis/user/postSignup.ts'

const style = StyleSheet.create({
	container: {
		height: '100%'
	},
	title: {
		fontSize: 16,
		color: color.black
	},
	header: {
		width: '100%',
		borderBottomWidth: 1,
		borderColor: color.gray200,
		padding: 10,
		paddingTop: 20,
		alignItems: 'center',
		flexDirection: 'row',
		gap: 10
	},
	main: {
		paddingVertical: 60,
		paddingHorizontal: 40,
		gap: 10
	},
	mainTitle: {
		fontSize: 28,
		fontWeight: '700',
		color: color.black
	},
	inputBox: {
		borderBottomWidth: 1,
		borderColor: color.gray800,
		paddingTop: 5,
		paddingBottom: 1,
		paddingHorizontal: 10,
		borderRadius: 12,
		flexDirection: 'column',
		gap: 15
	},
	inputText: {
		fontSize: 16
	},
	password: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	button: {
		borderRadius: 8,
		backgroundColor: color.blue300,
		padding: 10,
		alignItems: 'center',
		marginTop: 40
	},
	buttonText: {
		color: color.white
	},
	moveButton: {
		alignSelf: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
		marginTop: 5
	},
	moveButtonText: {
		color: color.gray700
	}
})

function SignupScreen() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>()
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isSecure, setIsSecure] = useState<boolean>(true)

	const submitSignup = useCallback(async () => {
		await postSignup({
			name,
			email,
			password
		})
			.then(() => {
				Toast.show({
					type: 'success',
					text1: '회원가입 성공!'
				})
				navigation.reset({ routes: [{ name: 'Auth' }] })
			})
			.catch(() =>
				Toast.show({
					type: 'error',
					text1: '회원가입 실패...'
				})
			)
	}, [name, email, password, navigation])

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={style.container}>
				<TouchableOpacity style={style.header} onPress={() => navigation.goBack()}>
					<ChevronLeft color={color.black} size={24} />
					<Text style={style.title}>회원가입</Text>
				</TouchableOpacity>
				<View style={style.main}>
					<Text style={style.mainTitle}>회원가입</Text>
					<View style={style.inputBox}>
						<TextInput
							style={style.inputText}
							placeholder="이름을 입력해주세요"
							value={name}
							onChange={e => setName(e.nativeEvent.text)}
						/>
					</View>
					<View style={style.inputBox}>
						<TextInput
							style={style.inputText}
							placeholder="이메일을 입력해주세요"
							value={email}
							onChange={e => setEmail(e.nativeEvent.text)}
						/>
					</View>
					<View style={[style.inputBox, style.password]}>
						<TextInput
							style={style.inputText}
							placeholder="비밀번호를 입력해주세요"
							value={password}
							onChange={e => setPassword(e.nativeEvent.text)}
							secureTextEntry={isSecure}
						/>
						<TouchableOpacity onPress={() => setIsSecure(prev => !prev)}>
						{
							isSecure ?
							<EyeOff size={20} color={color.black}/>
							:
							<Eye size={20} color={color.black} />
						}
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={style.button} onPress={submitSignup}>
						<Text style={style.buttonText}>회원가입</Text>
					</TouchableOpacity>
					<TouchableOpacity style={style.moveButton} onPress={() => navigation.navigate('Login')}>
						<Text style={style.moveButtonText}>이미 회원가입을 하셨나요?</Text>
						<ChevronRight color={color.gray700} size={24} />
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	)
}

export default SignupScreen
