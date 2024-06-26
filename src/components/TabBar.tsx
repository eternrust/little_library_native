/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Notebook, SearchIcon } from 'lucide-react-native'
import Main from '../pages/main/Main'
import Search from '../pages/search/Search'
import MyPage from '../pages/myPage/MyPage'

const Tab = createBottomTabNavigator()

export default function TabBar() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false
			}}
		>
			<Tab.Screen
				name="Home"
				component={Main}
				options={{
					tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
				}}
			/>
			<Tab.Screen
				name="Search"
				component={Search}
				options={{
					tabBarIcon: ({ color, size }) => <SearchIcon color={color} size={size} />
				}}
			/>
			<Tab.Screen
				name="MyPage"
				component={MyPage}
				options={{
					tabBarIcon: ({ color, size }) => <Notebook color={color} size={size} />
				}}
			/>
		</Tab.Navigator>
	)
}
