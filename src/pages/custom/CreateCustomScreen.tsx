import React, { useState } from 'react'
import {
	Keyboard,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View
} from 'react-native'
import { BookPlus, ChevronLeft, ListX } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Toast from 'react-native-toast-message'
import { color } from '../../styles/color.ts'
import { RootStackParam } from '../../utils/RootStackParam.ts'
import { getItem } from '../../utils/storage.ts'
import { postCreateCustomPage } from '../../apis/custom/postCreateCustomPage.ts'

const style = StyleSheet.create({
	container: {
		height: '100%',
		paddingBottom: 20,
		paddingHorizontal: 0
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
	plusBox: {
		marginLeft: 'auto',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5
	},
	plusText: {
		fontSize: 18,
		fontWeight: '600',
		color: color.black
	},
	titleInputBox: {
		borderWidth: 1,
		borderColor: color.gray800,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 12
	},
	inputBox: {
		borderBottomWidth: 1,
		borderColor: color.gray800,
		paddingTop: 5,
		paddingBottom: 1,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		flex: 1
	},
	inputText: {
		fontSize: 16,
		paddingRight: 20,
		width: '100%',

		flex: 1
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
	}
})

interface PageDataType {
	type: 'page' | 'block' | 'date'
	style: string
	data: string
}

function CreateCustomScreen() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>()
	const [title, setTitle] = useState<string>('')
	const [data, setData] = useState<PageDataType[]>([])

	const submitCreate = async () => {
		const token = await getItem('access_token')

		if (!token) {
			Toast.show({
				type: 'error',
				text1: 'token이 없습니다!'
			})
		}

		if (!title.length) {
			Toast.show({
				type: 'error',
				text1: 'title은 필수적으로 필요합니다!'
			})
		}

		postCreateCustomPage(token as string, {
			style: '',
			data: title,
			node: data
		})
			.then(() => {
				Toast.show({
					type: 'success',
					text1: '성공적으로 업로드 했습니다!'
				})
				navigation.pop()
			})
			.catch(() => {
				Toast.show({
					type: 'error',
					text1: '업로드를 하는데 실패했습니다!'
				})
			})
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<ScrollView>
				<SafeAreaView style={style.container}>
					<TouchableOpacity style={style.header} onPress={() => navigation.goBack()}>
						<ChevronLeft color={color.black} size={24} />
						<Text style={style.title}>커스텀 제작하기</Text>
					</TouchableOpacity>
					<View style={style.main}>
						<TouchableOpacity
							style={style.plusBox}
							onPress={() =>
								setData(prev => [
									...prev,
									{
										type: 'block',
										style: '',
										data: ''
									}
								])
							}
						>
							<Text style={style.plusText}>블록 추가하기</Text>
							<BookPlus size={20} color={color.black} />
						</TouchableOpacity>
						<Text style={style.title}>제목</Text>
						<View style={style.titleInputBox}>
							<TextInput
								style={style.inputText}
								placeholder="제목을 입력해주세요"
								value={title}
								onChangeText={v => setTitle(v)}
							/>
						</View>
						{data.map((v, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<View key={i} style={style.inputBox}>
								<TextInput
									value={v.data}
									onChangeText={value =>
										setData(prev => [...prev.slice(0, i), { ...prev[i], data: value }, ...prev.slice(i + 1)])
									}
									placeholder="글을 입력해주세요"
									style={style.inputText}
								/>

								<TouchableOpacity
									onPress={() =>
										setData(prev => [
											...prev.slice(0, i),
											...prev.slice(i + 1)
										])
									}
								>
									<ListX size={20} color={color.black} />
								</TouchableOpacity>
							</View>
						))}
						<TouchableOpacity onPress={submitCreate} style={style.button}>
							<Text style={style.buttonText}>생성하기</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</ScrollView>
		</TouchableWithoutFeedback>
	)
}

export default CreateCustomScreen
