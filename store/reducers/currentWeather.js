import { createSlice } from '@reduxjs/toolkit';

const currentWeatherSlice = createSlice({
	name: 'currentWeather',
	initialState: {
		current: null,
	},
	reducers: {
		setWeather(state, action) {
			state.current = action.payload.current;
		},
	},
});

export const currentWeather = currentWeatherSlice.actions;

export default currentWeatherSlice;
