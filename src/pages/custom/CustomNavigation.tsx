import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import CreateCustomScreen from './CreateCustomScreen.tsx'
import DetailCustomScreen from './DetailCustomScreen.tsx'
import EditCustomScreen from './EditCustomScreen.tsx'

const Stack = createNativeStackNavigator()

function CustomNavigation(): React.JSX.Element {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: false
			}}
		>
			<Stack.Screen name="CreateCustom" component={CreateCustomScreen} />
			<Stack.Screen name="DetailCustom" component={DetailCustomScreen} />
			<Stack.Screen name="EditCustom" component={EditCustomScreen} />
		</Stack.Navigator>
	)
}

export default CustomNavigation
