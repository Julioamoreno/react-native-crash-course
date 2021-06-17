import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';

export default function App() {
	const [errorMsg, setErrorMsg] = useState(null);
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [currentWeather, setCurrentWeather] = useState(null);
	const [unitsSystem, setUnitsSystem] = useState('metric');

	useEffect(() => {
		(async () => {
			try {
				let { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== 'granted') {
					setErrorMsg('Permission to access location was denied');
					return;
				}

				let location = await Location.getCurrentPositionAsync({});
				setLatitude(location.coords.latitude);
				setLongitude(location.coords.longitude);
			} catch (err) {
				setErrorMsg(err.message);
			}
		})();
	}, []);

	useEffect(() => {
		if (!latitude || !longitude) return;
		setCurrentWeather(null);
		setErrorMsg(null);
		(async () => {
			weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${process.env.WEATHER_API_KEY}`;
			const response = await fetch(weatherUrl);

			const result = await response.json();
			if (response.status === 200) {
				setCurrentWeather(result);
			} else {
				setErrorMsg(result.message);
			}
		})();
	}, [latitude, longitude, unitsSystem]);

	if (!!currentWeather) {
		return (
			<View style={styles.container}>
				<StatusBar style='auto' />
				<View style={styles.main}>
					<UnitsPicker
						unitsSystem={unitsSystem}
						setUnitsSystem={setUnitsSystem}
					/>
					<WeatherInfo currentWeather={currentWeather} />
				</View>
			</View>
		);
	} else if (errorMsg) {
		return (
			<View style={styles.container}>
				{errorMsg && <Text>{`Error: ${errorMsg}`}</Text>}
				<Text>Open up App.js to start working on your app!</Text>
				<StatusBar style='auto' />
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<ActivityIndicator />
				<StatusBar style='auto' />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	main: {
		justifyContent: 'center',
		flex: 1,
	},
});
