import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { color } from '../../styles/color.ts'
import { UserType, getUser } from '../../apis/user/getUser.ts'
import { getItem } from '../../utils/storage.ts'
import Toast from 'react-native-toast-message'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import CustomPreviewBox from '../../components/CustomPreviewBox.tsx'
import { CustomType } from '../../apis/custom/postCreateCustomPage.ts'
import { getCustomMe } from '../../apis/custom/getCustomMe.ts'
import { ChevronLeft } from 'lucide-react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParam } from '../../utils/RootStackParam.ts'
import { getCustomUser } from '../../apis/custom/getCustomUser.ts'

const style = StyleSheet.create({
	container: {
		height: '100%'
	},
	main: {
		marginVertical: 30,
		marginHorizontal: 20,
		gap: 10
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
	profileBox: {
		gap: 10,
		marginBottom: 30
	},
	profile: {
		width: 80,
		height: 80,
		borderWidth: 1,
		borderColor: color.blue800,
		borderRadius: 40
	},
	name: {
		fontSize: 24,
		fontWeight: '600'
	},
	subView: {
		marginTop: 10,
		gap: 20
	},
	subTitle: {
		color: color.black,
		fontSize: 24
	},
	box: {
		borderTopWidth: 1,
		borderColor: color.gray800,
		paddingVertical: 20,
		flexDirection: 'column',
		gap: 15
	},
})

function UserPage({ route }: { route: any }) {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>()
	const [userData, setUserData] = useState<UserType>()
	const [customMeData, setCustomMeData] = useState<CustomType[]>([])

	const getData = async (id: number) => {
		const token = await getItem('access_token')

		if (!token) {
			Toast.show({
				type: 'error',
				text1: 'token이 없습니다!'
			})
		}
		
		getUser(token as string, id).then(res => setUserData(res.data))
		getCustomUser(token as string, id).then(res => setCustomMeData(res.data))
	}

	useEffect(() => {
		getData(route.params.id)
	}, [route])

	return (
		<ScrollView>
			<SafeAreaView style={style.container}>
				<TouchableOpacity style={style.header} onPress={() => navigation.goBack()}>
					<ChevronLeft color={color.black} size={24} />
					<Text style={style.title}>{userData?.name}</Text>
				</TouchableOpacity>
				<View style={style.main}>
					<View style={style.profileBox}>
						<View style={style.profile} />
						<Text style={style.name}>{userData?.name}</Text>
					</View>
					<View style={style.subView}>
						<Text style={style.subTitle}>{userData?.name}의 커스텀</Text>
						<View style={style.box}>
							{customMeData.map((v, i) => (
								// eslint-disable-next-line react/no-array-index-key
								<CustomPreviewBox key={i} title={v.data} userName={v.user.name} updatedAt={v.updatedAt} id={v.id} />
							))}
						</View>
					</View>
					{/* <View style={style.subView}>
						<Text style={style.subTitle}>즐겨찾기한 커스텀</Text>
						<View style={style.box}>
							{userData?.bookmark.map((v, i) => (
								// eslint-disable-next-line react/no-array-index-key
								<CustomPreviewBox key={i} title={v.data} userName={v.user_name} updatedAt={v.updatedAt} id={v.id} />
							))}
						</View>
					</View> */}
				</View>
			</SafeAreaView>
		</ScrollView>
	)
}

export default UserPage
