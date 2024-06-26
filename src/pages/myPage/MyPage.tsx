import React, { useCallback, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { color } from '../../styles/color.ts'
import { UserType } from '../../apis/user/getUser.ts'
import { getItem, removeItem } from '../../utils/storage.ts'
import Toast from 'react-native-toast-message'
import { getUserMe } from '../../apis/user/getUserMe.ts'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import CustomPreviewBox from '../../components/CustomPreviewBox.tsx'
import { CustomType } from '../../apis/custom/postCreateCustomPage.ts'
import { getCustomMe } from '../../apis/custom/getCustomMe.ts'
import { LogOut, Pencil, Trash2 } from 'lucide-react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParam } from '../../utils/RootStackParam.ts'
import { deleteUser } from '../../apis/user/deleteUser.ts'

const style = StyleSheet.create({
	container: {
		marginVertical: 30,
		marginHorizontal: 20,
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
		fontWeight: '600',
		color: color.black
	},
	nameBox: {
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	iconBox: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	editIcon: {
		padding: 8,
		backgroundColor: color.gray100,
		borderRadius: 50
	},
	logOutIcon: {
		padding: 8,
		backgroundColor: color.blue100,
		borderRadius: 50
	},
	quitIcon: {
		padding: 8,
		backgroundColor: color.red100,
		borderRadius: 50
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

function MyPage() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>()
	const [userData, setUserData] = useState<UserType>()
	const [customMeData, setCustomMeData] = useState<CustomType[]>([])

	const getMyData = async () => {
		const token = await getItem('access_token')

		if (!token) {
			Toast.show({
				type: 'error',
				text1: 'token이 없습니다!'
			})
		}

		getUserMe(token as string).then(res => setUserData(res.data))
		getCustomMe(token as string).then(res => setCustomMeData(res.data))
	}

	const submitLogOut = () => {
		removeItem('access_token')
		removeItem('refresh_token')

		Toast.show({
			type: 'success',
			text1: '로그아웃 되었습니다'
		})
		navigation.reset({ routes: [{ name: 'Auth' }] })
	}

	const submitQuit = async () => {
		const token = await getItem('access_token')

		if (!token) {
			Toast.show({
				type: 'error',
				text1: 'token이 없습니다!'
			})
		}

		deleteUser(token as string).then(() => {
			Toast.show({
				type: 'success',
				text1: '회원 탈퇴가 되었습니다'
			})
			navigation.reset({ routes: [{ name: 'Auth' }] })
		})
	}

	useFocusEffect(
		useCallback(() => {
			getMyData()
		}, [])
	)
	return (
		<ScrollView>
			<SafeAreaView style={style.container}>
				<View style={style.profileBox}>
					<View style={style.profile} />
					<View style={style.nameBox}>
						<Text style={style.name}>{userData?.name}</Text>
						<View style={style.iconBox}>
							<TouchableOpacity style={style.editIcon} onPress={() => navigation.navigate('MyPageEdit')}>
								<Pencil size={18} color={color.black} />
							</TouchableOpacity>
							<TouchableOpacity style={style.logOutIcon} onPress={submitLogOut}>
								<LogOut size={18} color={color.black} />
							</TouchableOpacity>
							<TouchableOpacity style={style.quitIcon} onPress={submitQuit}>
								<Trash2 size={18} color={color.black} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View style={style.subView}>
					<Text style={style.subTitle}>내 커스텀</Text>
					<View style={style.box}>
						{customMeData.map((v, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<CustomPreviewBox key={i} title={v.data} userName={v.user.name} updatedAt={v.updatedAt} id={v.id} />
						))}
					</View>
				</View>
				<View style={style.subView}>
					<Text style={style.subTitle}>즐겨찾기한 커스텀</Text>
					<View style={style.box}>
						{userData?.bookmark.map((v, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<CustomPreviewBox key={i} title={v.data} userName={v.user_name} updatedAt={v.updatedAt} id={v.id} />
						))}
					</View>
				</View>
			</SafeAreaView>
		</ScrollView>
	)
}

export default MyPage
