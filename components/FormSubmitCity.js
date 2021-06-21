import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { searchsActions } from '../store';

import { MaterialIcons } from '@expo/vector-icons';

import { colors } from '../utils/';
const { PRIMARY_COLOR, BORDER_COLOR } = colors;
const apiLink =
	'https://api.opencagedata.com/geocode/v1/json?key=2e413bb17c824fa1a6ae997329d8dcdc&q=';

export default function FormSubmitCity({ navigation }) {
	const [city, setCity] = useState('');
	const dispatch = useDispatch();
	const submitHandle = async () => {
		const regex = /[ ]/g;
		const cityFormated = city.replace(regex, '+').toLowerCase();

		try {
			const linkLocation = apiLink + cityFormated;
			const response = await fetch(linkLocation);
			const responseFormated = await response.json();
			if (response.ok) {
				if (responseFormated.results.length === 0) {
					return Alert.alert('Local não encontrado');
				}
				const components = responseFormated.results[0].components;
				const type = !!components.city ? 'city' : 'town';
				dispatch(
					searchsActions.setWeather({
						geometry: responseFormated.results[0].geometry,
						location: components[type],
						city: components.state_code,
						country: components.country,
					})
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<View style={styles.main}>
			<Text style={styles.title}>Type your location here:</Text>
			<TextInput style={styles.input} onChangeText={(text) => setCity(text)} />
			<View style={styles.buttonsRow}>
				<TouchableOpacity style={styles.submitButton} onPress={submitHandle}>
					<Text style={styles.textButton}>Submit</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.submitButton}
					onPress={() => navigation.push('Home')}
				>
					<Text style={styles.textButton}>
						<MaterialIcons name='my-location' size={24} color='white' />
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		margin: 10,
	},
	title: {
		fontSize: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: BORDER_COLOR,
		borderRadius: 10,
		paddingLeft: 10,
		marginTop: 10,
		marginBottom: 10,
		height: 50,
	},
	buttonsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	submitButton: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 120,
		height: 50,
		borderRadius: 10,
		backgroundColor: PRIMARY_COLOR,
	},
	textButton: {
		color: 'white',
		fontWeight: 'bold',
	},
});
