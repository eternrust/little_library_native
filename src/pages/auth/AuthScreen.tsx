import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { color } from '../../styles/color.ts'
import { RootStackParam } from '../../utils/RootStackParam.ts'
import Logo from '../../assets/logo.svg'

const style = StyleSheet.create({
	container: {
		paddingTop: 200,
		paddingBottom: 100,
		paddingHorizontal: 30,
		justifyContent: 'space-between',
		height: '100%',
		gap: 10
	},
	logoBox: {
		width: '100%',
		alignItems: 'center',
		gap: 60
	},
	titleBox: {
		alignItems: 'center',
		gap: 20
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		color: color.black
	},
	subTitle: {
		fontSize: 18,
		fontWeight: '500',
		color: color.gray600
	},
	buttonBox: {
		gap: 20
	},
	button: {
		borderWidth: 1,
		borderRadius: 12,
		padding: 10,
		alignItems: 'center'
	},
	loginButton: {
		backgroundColor: color.blue500,
		borderColor: color.skyblue500
	},
	loginText: {
		color: color.white
	},
	buttonFont: {
		fontSize: 18,
		color: color.black
	}
})

function AuthScreen() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>()

	return (
		<SafeAreaView style={style.container}>
			<View style={style.logoBox}>
				<Logo width={150} height={150} />
				<View style={style.titleBox}>
					<Text style={style.title}>내 손 안에 작은 도서관</Text>
					<Text style={style.subTitle}>로그인해서 지금 사용해보세요!</Text>
				</View>
			</View>
			<View style={style.buttonBox}>
				<TouchableOpacity
					style={[style.button, style.loginButton]}
					onPress={() => navigation.push('Login')}
				>
					<Text style={[style.buttonFont, style.loginText]}>로그인</Text>
				</TouchableOpacity>
				<TouchableOpacity style={style.button} onPress={() => navigation.push('Signup')}>
					<Text style={style.buttonFont}>회원가입</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

export default AuthScreen
