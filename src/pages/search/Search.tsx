import React, { useCallback, useRef, useState } from 'react'
import { SafeAreaView, StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Text } from 'react-native'
import { Search } from 'lucide-react-native'
import Toast from 'react-native-toast-message'
import { color } from '../../styles/color.ts'
import { CustomPreviewType, getSearchCustom } from '../../apis/custom/getSearchCustom.ts'
import CustomPreviewBox from '../../components/CustomPreviewBox.tsx'
import { getItem } from '../../utils/storage.ts'
import { useFocusEffect } from '@react-navigation/native'
import { getCustomRecommend } from '../../apis/custom/getCustomRecommend.ts'
import { CustomType } from '../../apis/custom/postCreateCustomPage.ts'

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
	input: {
		padding: 5,
		fontSize: 16
	},
	header: {
		borderBottomWidth: 1,
		borderColor: color.gray800,
		paddingHorizontal: 20,
		borderRadius: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	box: {
		marginTop: 30,
		flexDirection: 'column',
		gap: 15
	},
	searchTitle: {
		fontSize: 28,
		fontWeight: '500',
		color: color.black
	}
})

function SearcPage() {
	const [searchWord, setSearchWord] = useState<string>('')
	const [recommendData, setRecommendData] = useState<CustomType[]>([])
	const [customData, setCustomData] = useState<CustomPreviewType[]>([])
	// eslint-disable-next-line no-undef
	const timer = useRef<NodeJS.Timeout | null>(null)

	const getData = async (value?: string) => {
		const token = await getItem('access_token')

		if (!token) {
			Toast.show({
				type: 'error',
				text1: 'token이 없습니다!'
			})
		}

		getSearchCustom(token as string, value || searchWord).then(res => setCustomData(res.data))
	}

	const changeData = (value: string) => {
		setSearchWord(value)

		if (timer.current) {
			clearInterval(timer.current)
			timer.current = null
		}

		timer.current = setInterval(() => {
			getData(value)

			if (timer.current) {
				clearInterval(timer.current)
				timer.current = null
			}
		}, 900)
	}

	const getRecommendData = async () => {
		const token = await getItem('access_token')

		if (!token) {
			Toast.show({
				type: 'error',
				text1: 'token이 없습니다!'
			})
		}

		getCustomRecommend(token as string).then(res => setRecommendData(res.data))
	}

	useFocusEffect(
		useCallback(() => {
			getRecommendData()
		}, [])
	)

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<ScrollView>
				<SafeAreaView style={style.container}>
					<View style={style.header}>
						<TextInput
							style={style.input}
							placeholder="검색어를 입력해주세요"
							onChangeText={changeData}
							value={searchWord}
						/>
						<Search color={color.black} size={20} />
					</View>
					<View style={style.box}>
						<Text style={style.searchTitle}>{searchWord ? `${searchWord}로 검색한 결과` : '추천 결과'}</Text>
						{((searchWord ? customData : recommendData.slice(0, 4)) as (CustomType & CustomPreviewType)[]).map((v, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<CustomPreviewBox key={i} title={v.data} userName={v.user_name || v.user.name} updatedAt={v.updatedAt} id={v.id} />
						))}
					</View>
				</SafeAreaView>
			</ScrollView>
		</TouchableWithoutFeedback>
	)
}

export default SearcPage
