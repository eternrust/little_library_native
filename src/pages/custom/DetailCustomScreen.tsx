import React, { useEffect, useRef, useState } from 'react'
import {
	Keyboard,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View
} from 'react-native'
import { Bookmark, BookmarkCheck, ChevronLeft, EllipsisVertical } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Toast from 'react-native-toast-message'
import { color } from '../../styles/color.ts'
import { RootStackParam } from '../../utils/RootStackParam.ts'
import { getItem } from '../../utils/storage.ts'
import { CustomType } from '../../apis/custom/postCreateCustomPage.ts'
import { getCustom } from '../../apis/custom/getCustom.ts'
import { postBookmarkCheck } from '../../apis/custom/postBookmarkCheck.ts'
import { Dialog, Divider, Menu, Portal, Text as DialogText, Button } from 'react-native-paper'
import { deleteCustom } from '../../apis/custom/deleteCustom.ts'

const style = StyleSheet.create({
	container: {
		height: '100%',
		paddingBottom: 20,
		paddingHorizontal: 0
	},
	backText: {
		fontSize: 16,
		color: color.black
	},
	title: {
		fontSize: 24,
		fontWeight: '600',
		color: color.black
	},
	subTitle: {
		fontSize: 18,
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
		padding: 7,
		alignItems: 'center',
	},
	buttonText: {
		color: color.white
	},
	rightButtonBox: {
		marginLeft: 'auto',
		gap: 20,
		flexDirection: 'row'
	},
	menu: {
		backgroundColor: color.skyblue300
	}
})

function DetailCustomScreen({ route }: { route: any }) {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>()
	const [isBookmark, setIsBookMark] = useState<boolean>(false)
	const [data, setData] = useState<CustomType>()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	// eslint-disable-next-line no-undef
	const timer = useRef<NodeJS.Timeout | null>(null)

	const openMenu = () => setIsMenuOpen(true)
	const closeMenu = () => setIsMenuOpen(false)

	const showDialog = () => { setIsDialogOpen(true); setIsMenuOpen(false) }
	const hideDialog = () => { setIsDialogOpen(false); setIsMenuOpen(false) }

	const getData = async (id: number) => {
		const token = await getItem('access_token')

		if (!token) {
			Toast.show({
				type: 'error',
				text1: 'token이 없습니다!'
			})
		}

		getCustom(token as string, id).then((res) => {
			setData(res.data)
			setIsBookMark(res.data.isBookmark)
		})
	}

	const deleteCustomPage = async () => {
		const token = await getItem('access_token')

		if (!token) {
			Toast.show({
				type: 'error',
				text1: 'token이 없습니다!'
			})
		}

		deleteCustom(token as string, route.params.id).then(() => {
			Toast.show({
				type: 'success',
				text1: '성공적으로 삭제했습니다.'
			})
			navigation.reset({ routes: [{ name: 'Main' }] })
		}).catch(() => {
			Toast.show({
				type: 'error',
				text1: '삭제에 실패했습니다.'
			})
		})
	}

	const postCheck = async () => {
		const token = await getItem('access_token')

		if (!token) {
			Toast.show({
				type: 'error',
				text1: 'token이 없습니다!'
			})
		}

		if (data) {
			if (data.isBookmark === !isBookmark) return

			postBookmarkCheck(token as string, data.id).then(() => {
				setData(({
					...data,
					isBookmark
				}))
			})
		} else {
			Toast.show({
				type: 'error',
				text1: '잘못된 접근입니다!'
			})
		}
	}

	const bookmarkCheck = () => {
		setIsBookMark(prev => !prev)

		if (timer.current) {
			clearInterval(timer.current)
			timer.current = null
		}

		timer.current = setInterval(() => {
			postCheck()

			if (timer.current) {
				clearInterval(timer.current)
				timer.current = null
			}
		}, 2000)
	}

	useEffect(() => {
		getData(route.params.id)
	}, [route])

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<ScrollView>
				<SafeAreaView style={style.container}>
					<TouchableOpacity style={style.header} onPress={() => navigation.goBack()}>
						<ChevronLeft color={color.black} size={24} />
						<Text style={style.backText}>{data?.data}</Text>
					</TouchableOpacity>
					<View style={style.main}>
						<View style={style.rightButtonBox}>
							<TouchableOpacity onPress={bookmarkCheck}>
								{
									isBookmark ?
										<BookmarkCheck size={28} color={color.green600} />
										:
										<Bookmark size={28} color={color.black} />
								}
							</TouchableOpacity>
							{
								data?.isMe &&
								<Menu
									visible={isMenuOpen}
									onDismiss={closeMenu}
									anchor={
										<TouchableOpacity onPress={openMenu}>
											<EllipsisVertical size={28} color={color.black} />
										</TouchableOpacity>
									}>
									<Menu.Item onPress={() => { closeMenu(); navigation.navigate('Custom', { screen: 'EditCustom', params: { id: route.params.id } }) }} title="수정하기" />
									<Divider />
									<Menu.Item onPress={showDialog} title="삭제하기" />
								</Menu>
							}
							{/* <TouchableOpacity onPress={() => navigation.navigate('Custom', { screen: 'EditCustom', params: { id: route.params.id } })} style={style.button}>
								<Text style={style.buttonText}>수정하기</Text>
							</TouchableOpacity> */}
						</View>

						<Text style={style.title}>{data?.data}</Text>
						<TouchableOpacity onPress={() => navigation.navigate('User', { screen: 'UserPage', params: { id: data?.userId || 0 } })}>
							<Text style={style.subTitle}>작성자: {data?.user.name}</Text>
						</TouchableOpacity>
						{data?.node.map((v, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<View key={i} style={style.inputBox}>
								<Text style={style.inputText}>{v.data}</Text>
							</View>
						))}
					</View>
					<Portal>
						<Dialog visible={isDialogOpen} onDismiss={hideDialog}>
							<Dialog.Title>정말로 삭제하시겠습니까?</Dialog.Title>
							<Dialog.Content>
								<DialogText variant="bodyMedium">한 번 삭제하면 되돌릴 수 없습니다</DialogText>
							</Dialog.Content>
							<Dialog.Actions>
								<Button onPress={hideDialog}>취소하기</Button>
								<Button onPress={() => { hideDialog(); deleteCustomPage() }}>삭제하기</Button>
							</Dialog.Actions>
						</Dialog>
					</Portal>
				</SafeAreaView>
			</ScrollView>
		</TouchableWithoutFeedback>
	)
}

export default DetailCustomScreen
