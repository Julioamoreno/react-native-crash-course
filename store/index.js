import { configureStore } from '@reduxjs/toolkit';

import currentWeather from './reducers/currentWeather';

const store = configureStore({
	reducer: {
		currentWeather: currentWeather.reducer,
	},
});

export const currentWeatherActions = currentWeather.actions;

export default store;
