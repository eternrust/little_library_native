import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Main from './src/pages/main/Main.tsx'

const Stack = createNativeStackNavigator()

function App(): React.JSX.Element {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Main" component={Main} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
