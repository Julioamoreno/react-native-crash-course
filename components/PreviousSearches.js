import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { useSelector } from 'react-redux';

import { colors } from '../utils';
const { PRIMARY_COLOR, BORDER_COLOR } = colors;

export default function PreviousSearches({ navigation }) {
	const searchs = useSelector((state) => state.searchs);

	return (
		<View style={styles.main}>
			{searchs.length > 0 && (
				<Text style={styles.title}>Previous Searches</Text>
			)}
			<ScrollView>
				{searchs.map((search, idx) => (
					<View style={styles.card} key={idx}>
						<View style={styles.cardContent}>
							<View style={styles.cardColumn}>
								<View>
									<Text style={{ ...styles.cardText, fontWeight: 'bold' }}>
										{search.location}
									</Text>
									<Text style={styles.cardText}>
										{search.city}, {search.country}
									</Text>
								</View>
								<AntDesign
									name='arrowright'
									size={24}
									color={PRIMARY_COLOR}
									onPress={() =>
										navigation.push('Home', {
											search,
										})
									}
								/>
							</View>
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		margin: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	card: {
		backgroundColor: BORDER_COLOR,
		height: 70,
		marginTop: 10,
		borderRadius: 5,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	cardContent: {
		margin: 10,
		borderLeftWidth: 3,
		borderLeftColor: PRIMARY_COLOR,
		justifyContent: 'center',
	},
	cardText: {
		marginLeft: 10,
	},
	cardColumn: {
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
});
