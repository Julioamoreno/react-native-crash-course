import { configureStore } from '@reduxjs/toolkit';

import currentWeather from './reducers/currentWeather';
import searchs from './reducers/searchs';

const store = configureStore({
	reducer: {
		currentWeather: currentWeather.reducer,
		searchs: searchs.reducer,
	},
});

export const currentWeatherActions = currentWeather.actions;
export const searchsActions = searchs.actions;

export default store;
