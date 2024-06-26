import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message'
import TabBar from './src/components/TabBar.tsx'
import AuthNavigation from './src/pages/auth/AuthNavigation.tsx'
import CustomNavigation from './src/pages/custom/CustomNavigation.tsx'
import { MD3DarkTheme, PaperProvider } from 'react-native-paper'
import MyPageEdit from './src/pages/myPage/MyPageEdit.tsx'
import UserNavigation from './src/pages/myPage/CustomNavigation copy.tsx'

const Stack = createNativeStackNavigator()

const toastConfig = {
	success: (props: BaseToastProps) => <BaseToast {...props} />,
	error: (props: BaseToastProps) => <ErrorToast {...props} />
}

function App(): React.JSX.Element {
	return (
		<PaperProvider theme={MD3DarkTheme}>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false
					}}
					initialRouteName="Auth"
				>
					<Stack.Screen name="Main" component={TabBar} />
					<Stack.Screen name="Auth" component={AuthNavigation} />
					<Stack.Screen name="Custom" component={CustomNavigation} />
					<Stack.Screen name="MyPageEdit" component={MyPageEdit} />
					<Stack.Screen name="User" component={UserNavigation} />
				</Stack.Navigator>
			</NavigationContainer>
			<Toast config={toastConfig} />
		</PaperProvider>
	)
}

export default App
