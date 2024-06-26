import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import AuthScreen from './AuthScreen.tsx'
import LoginScreen from './LoginScreen.tsx'
import SignupScreen from './SignupScreen.tsx'

const Stack = createNativeStackNavigator()

function AuthNavigation(): React.JSX.Element {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: false
			}}
			initialRouteName="Rending"
		>
			<Stack.Screen name="Rending" component={AuthScreen} />
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Signup" component={SignupScreen} />
		</Stack.Navigator>
	)
}

export default AuthNavigation
