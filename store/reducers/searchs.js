import { createSlice } from '@reduxjs/toolkit';

const searchesInitialState = [];

const previousSearchesSlice = createSlice({
	name: 'currentWeather',
	initialState: searchesInitialState,
	reducers: {
		setWeather(state, action) {
			state.push({
				latitude: action.payload.geometry.lat,
				longitude: action.payload.geometry.lng,
				location: action.payload.location,
				city: action.payload.city,
				country: action.payload.country,
			});
		},
	},
});

export const previousSearches = previousSearchesSlice.actions;

export default previousSearchesSlice;
