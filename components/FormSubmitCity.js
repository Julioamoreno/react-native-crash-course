import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { colors } from '../utils/';
const { PRIMARY_COLOR, BORDER_COLOR } = colors;
const apiLink =
	'https://api.opencagedata.com/geocode/v1/json?key=2e413bb17c824fa1a6ae997329d8dcdc&q=';

export default function FormSubmitCity() {
	const [city, setCity] = useState('');

	const submitHandle = async () => {
		const regex = /[ ]/g;
		const cityFormated = city.replace(regex, '+').toLowerCase();

		try {
			const linkLocation = apiLink + cityFormated;
			const response = await fetch(linkLocation);
			const responseFormated = await response.json();
			if (response.ok) {
				if (responseFormated.results.length === 0) {
					console.log('entrou');
					return alert('Local não encontrado');
				}
				const components = responseFormated.results[0].components;
				const type = components['_type'];
				console.log(responseFormated.results[0].geometry);
				// console.log(components);
				console.log(components[type]);
				console.log(`${components.state_code}, ${components.country}`);
			}
		} catch (err) {
			alert(err);
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
				<TouchableOpacity style={styles.submitButton}>
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
