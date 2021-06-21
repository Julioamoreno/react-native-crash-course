import React from 'react';

import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import store from './store';

import HomeScreen from './screens/Home';
import SearchScreen from './screens/Search';

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Provider store={store}>
				<Stack.Navigator>
					<Stack.Screen name='Search' component={SearchScreen} />
					<Stack.Screen name='Home' component={HomeScreen} />
				</Stack.Navigator>
			</Provider>
		</NavigationContainer>
	);
}
