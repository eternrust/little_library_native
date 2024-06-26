import React, { useCallback, useEffect, useState } from 'react'
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
import { ChevronLeft } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Toast from 'react-native-toast-message'
import { color } from '../../styles/color.ts'
import { RootStackParam } from '../../utils/RootStackParam.ts'
import { getItem } from '../../utils/storage.ts'
import { getUserMe } from '../../apis/user/getUserMe.ts'
import { patchUser } from '../../apis/user/patchUser.ts'

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

function MyPageEdit() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>()
	const [nickname, setNickname] = useState<string>('')

	const submitEdit = useCallback(async () => {
		const token = await getItem('access_token')

		if (!token) {
			Toast.show({
				type: 'error',
				text1: 'token이 없습니다!'
			})
		}

		await patchUser(token as string, { name: nickname })
			.then(() => {
				Toast.show({
					type: 'success',
					text1: '정보 변경 성공!'
				})
				navigation.pop()
			})
			.catch(() =>
				Toast.show({
					type: 'error',
					text1: '정보 변경 실패...'
				})
			)
	}, [nickname, navigation])

	const getMyData = async () => {
		const token = await getItem('access_token')

		if (!token) {
			Toast.show({
				type: 'error',
				text1: 'token이 없습니다!'
			})
		}

		getUserMe(token as string).then(res => setNickname(res.data.name))
	}

	useEffect(() => {
		getMyData()
	}, [])

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={style.container}>
				<TouchableOpacity style={style.header} onPress={() => navigation.goBack()}>
					<ChevronLeft color={color.black} size={24} />
					<Text style={style.title}>유저 정보 변경하기</Text>
				</TouchableOpacity>
				<View style={style.main}>
					<Text style={style.mainTitle}>정보 변경하기</Text>
					<View style={style.inputBox}>
						<TextInput
							style={style.inputText}
							placeholder="변경할 이름을 입력해주세요"
							value={nickname}
							onChange={e => setNickname(e.nativeEvent.text)}
						/>
					</View>
					<TouchableOpacity style={style.button} onPress={submitEdit}>
						<Text style={style.buttonText}>수정하기</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	)
}

export default MyPageEdit
