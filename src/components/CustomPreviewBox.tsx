import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { color } from '../styles/color.ts'
import { RootStackParam } from '../utils/RootStackParam.ts'
import { dateToString } from '../utils/dateToString.ts'

const style = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: color.black,
		borderRadius: 12,
		padding: 16
	},
	title: {
		color: color.black,
		fontSize: 20,
		fontWeight: '700'
	},
	text: {
		color: color.gray800,
		fontSize: 16
	},
	rowBox: {
		flexDirection: 'row',
		marginLeft: 'auto',
		gap: 10
	}
})

interface CustomPreviewBoxProps {
	id: number
	title: string
	userName: string
	updatedAt: string
}

function CustomPreviewBox({ id, title, userName, updatedAt }: CustomPreviewBoxProps) {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>()

	return (
		<TouchableOpacity
			style={style.container}
			onPress={() => navigation.navigate('Custom', { screen: 'DetailCustom', params: { id } })}
		>
			<Text style={style.title}>{title}</Text>
			<View style={style.rowBox}>
				<Text style={style.text}>{userName}</Text>
				<Text style={style.text}>|</Text>
				<Text style={style.text}>{dateToString(updatedAt)}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default CustomPreviewBox
