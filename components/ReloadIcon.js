import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils';

export default function ReloadIcon({ load }) {
	return (
		<View style={styles.reloadIcon}>
			<Ionicons
				onPress={load}
				name='refresh'
				size={24}
				color={colors.PRIMARY_COLOR}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	reloadIcon: {
		position: 'absolute',
		...Platform.select({
			ios: {
				top: -40,
			},
			android: {
				top: 40,
			},
		}),
		right: 20,
	},
});
