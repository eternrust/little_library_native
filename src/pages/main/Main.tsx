import React, { useCallback, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, NativeModules, TouchableOpacity, ScrollView } from 'react-native'
import Toast from 'react-native-toast-message'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { color } from '../../styles/color.ts'
import CustomPreviewBox from '../../components/CustomPreviewBox.tsx'
import { getItem } from '../../utils/storage.ts'
import { getCustomMe } from '../../apis/custom/getCustomMe.ts'
import { CustomType } from '../../apis/custom/postCreateCustomPage.ts'
import { RootStackParam } from '../../utils/RootStackParam.ts'
import { getCustomRecommend } from '../../apis/custom/getCustomRecommend.ts'

const { CalendarModule } = NativeModules

const style = StyleSheet.create({
	container: {
		marginVertical: 30,
		marginHorizontal: 20,
		gap: 10
	},
	title: {
		fontSize: 20,
		color: color.black
	},
	box: {
		borderTopWidth: 1,
		borderColor: color.gray800,
		paddingVertical: 20,
		flexDirection: 'column',
		gap: 15
	},
	subView: {
		marginTop: 20,
		gap: 10
	},
	subTitle: {
		color: color.black,
		fontSize: 24
	},
	createButton: {
		marginLeft: 'auto',
		borderWidth: 1,
		borderRadius: 12,
		padding: 10,
		alignItems: 'center',
		backgroundColor: color.blue300,
		borderColor: color.skyblue500
	},
	buttonFont: {
		fontSize: 16,
		color: color.white
	}
})

function Main() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>()
	const [recommendData, setRecommendData] = useState<CustomType[]>([])
	const [customMeData, setCustomMeData] = useState<CustomType[]>([])

	const onPress = () => {
		CalendarModule.createCalendarEvent('testName', 'testLocation')
	}

	const getMyData = async () => {
		const token = await getItem('access_token')

		if (!token) {
			Toast.show({
				type: 'error',
				text1: 'token이 없습니다!'
			})
		}

		getCustomRecommend(token as string).then(res => setRecommendData(res.data))
		getCustomMe(token as string).then(res => setCustomMeData(res.data.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())))
	}

	useFocusEffect(
		useCallback(() => {
			getMyData()
		}, [])
	)

	return (
		<ScrollView>
			<SafeAreaView style={style.container}>
				<View>
					<Text style={style.title} onPress={onPress}>
						작은 도서관
					</Text>
				</View>
				<TouchableOpacity
					style={style.createButton}
					onPress={() => navigation.navigate('Custom', { screen: 'CreateCustom' })}
				>
					<Text style={style.buttonFont}>커스텀 제작하기</Text>
				</TouchableOpacity>
				<View style={style.subView}>
					<Text style={style.subTitle}>다른 사람들의 커스텀</Text>
					<View style={style.box}>
						{/* <CustomPreviewBox title="임시 데이터" userName="임시" updatedAt="2024-06-18T11:19:31.600Z" id={1} /> */}
						{recommendData.slice(0, 4).map((v, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<CustomPreviewBox key={i} title={v.data} userName={v.user.name} updatedAt={v.updatedAt} id={v.id} />
						))}
					</View>
				</View>
				<View style={style.subView}>
					<Text style={style.subTitle}>최근 수정한 커스텀</Text>
					<View style={style.box}>
						{customMeData.slice(0, 4).map((v, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<CustomPreviewBox key={i} title={v.data} userName={v.user.name} updatedAt={v.updatedAt} id={v.id} />
						))}
					</View>
				</View>
			</SafeAreaView>
		</ScrollView>
	)
}

export default Main
