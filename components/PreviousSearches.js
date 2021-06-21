import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { colors } from '../utils';
const { PRIMARY_COLOR, BORDER_COLOR } = colors;

export default function PreviousSearches() {
	return (
		<View style={styles.main}>
			<Text style={styles.title}>Previous Searches</Text>
			<View style={styles.card}>
				<View style={styles.cardContent}>
					<View style={styles.cardColumn}>
						<View>
							<Text style={{ ...styles.cardText, fontWeight: 'bold' }}>
								Rio de Janeiro
							</Text>
							<Text style={styles.cardText}>RJ, Brazil</Text>
						</View>
						<AntDesign name='arrowright' size={24} color={PRIMARY_COLOR} />
					</View>
				</View>
			</View>
			<View style={styles.card}>
				<View style={styles.cardContent}>
					<View style={styles.cardColumn}>
						<View>
							<Text style={{ ...styles.cardText, fontWeight: 'bold' }}>
								Santo Antônio de Pádua
							</Text>
							<Text style={styles.cardText}>RJ, Brazil</Text>
						</View>
						<AntDesign name='arrowright' size={24} color={PRIMARY_COLOR} />
					</View>
				</View>
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
