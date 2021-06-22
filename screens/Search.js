import React from 'react';
import { View, StyleSheet } from 'react-native';

import FormSubmitCity from '../components/FormSubmitCity';
import PreviousSearches from '../components/PreviousSearches';

export default function SearchScreen({ navigation }) {
	return (
		<View style={styles.main}>
			<FormSubmitCity navigation={navigation} />
			<PreviousSearches navigation={navigation} />
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		backgroundColor: 'white',
		flex: 1,
	},
});
