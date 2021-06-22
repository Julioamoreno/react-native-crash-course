import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import * as Location from 'expo-location';

import { colors } from '../utils';

import WeatherInfo from '../components/WeatherInfo';
import UnitsPicker from '../components/UnitsPicker';
import ReloadIcon from '../components/ReloadIcon';
import WeatherDetails from '../components/WeatherDetails';

export default function Home({ route }) {
	const [errorMsg, setErrorMsg] = useState(null);
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [currentWeather, setCurrentWeather] = useState(null);
	const [unitsSystem, setUnitsSystem] = useState('metric');

	useEffect(() => {
		setCurrentWeather(null);
		setErrorMsg(null);
		if (!!route.params) {
			setLatitude(route.params.search.latitude);
			setLongitude(route.params.search.longitude);
			return;
		}
		load();
	}, []);

	useEffect(() => {
		if (!latitude || !longitude) return;
		requestAPI();
	}, [latitude, longitude, unitsSystem]);

	const requestAPI = async () => {
		try {
			const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${process.env.WEATHER_API_KEY}`;
			const response = await fetch(weatherUrl);

			const result = await response.json();
			if (response.status === 200) {
				setCurrentWeather(result);
			} else {
				setErrorMsg(result.message);
			}
		} catch (err) {
			setErrorMsg(err.message);
		}
	};

	const load = async () => {
		setCurrentWeather(null);
		setErrorMsg(null);
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
	};

	if (!!currentWeather) {
		return (
			<View style={styles.container}>
				<StatusBar style='auto' />
				<View style={styles.main}>
					<UnitsPicker
						unitsSystem={unitsSystem}
						setUnitsSystem={setUnitsSystem}
					/>
					<ReloadIcon load={load} />
					<WeatherInfo currentWeather={currentWeather} />
				</View>
				<WeatherDetails
					currentWeather={currentWeather}
					unitsSystem={unitsSystem}
				/>
			</View>
		);
	} else if (errorMsg) {
		return (
			<View style={styles.container}>
				<ReloadIcon load={load} />
				<Text style={{ textAlign: 'center' }}>{`Error: ${errorMsg}`}</Text>
				<StatusBar style='auto' />
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<ActivityIndicator size='large' color={colors.PRIMARY_COLOR} />
				<StatusBar style='auto' />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	main: {
		justifyContent: 'center',
		flex: 1,
	},
});
