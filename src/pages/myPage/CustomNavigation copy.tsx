import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import UserPage from './UserPage.tsx'

const Stack = createNativeStackNavigator()

function UserNavigation(): React.JSX.Element {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: false
			}}
		>
			<Stack.Screen name="UserPage" component={UserPage} />
		</Stack.Navigator>
	)
}

export default UserNavigation
