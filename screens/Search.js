import React from 'react';
import { View, Text } from 'react-native';

import FormSubmitCity from '../components/FormSubmitCity';
import PreviousSearches from '../components/PreviousSearches';

export default function SearchScreen({ navigation }) {
	return (
		<View>
			<FormSubmitCity navigation={navigation} />
			<PreviousSearches navigation={navigation} />
		</View>
	);
}
