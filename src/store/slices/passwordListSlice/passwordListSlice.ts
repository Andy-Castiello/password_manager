import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export type Password = {
	id: number;
	name: string;
	previousPassword: string;
	password: string;
	lastUpdate: string;
};

export type PasswordsListType = {
	selected: number | null;
	list: Password[];
	nextId: number;
};
const initialState: PasswordsListType = {
	selected: null,
	list: [],
	nextId: 0,
};
const passwordListSlice = createSlice({
	name: 'passwordList',
	initialState,
	reducers: {
		setSelectedPassword: (state, action) => {
			state.selected = action.payload;
		},
		addPassword: (state, action) => {
			state.list.push({
				id: state.nextId,
				name: action.payload.name,
				previousPassword: '',
				password: action.payload.password,
				lastUpdate: moment().format('DD/MM/YYYY HH:mm') + 'hs',
			});
			state.nextId++;
		},
		uploadPasswordData: (state, action) => {
			state.list = action.payload.list;
			state.nextId = action.payload.nextId;
		},
		editPassword: (state, action) => {
			state.list[action.payload.id] = {
				id: action.payload.id,
				name: action.payload.name,
				previousPassword: action.payload.previousPassword,
				password: action.payload.password,
				lastUpdate: moment().format('DD/MM/YYYY HH:mm') + 'hs',
			};
		},
		removePassword: (state, action) => {
			state.list = state.list.filter(
				(pass) => pass.id !== action.payload
			);
		},
		clearPasswordsList: (state) => {
			state.selected = initialState.selected;
			state.list = initialState.list;
			state.nextId = initialState.nextId;
		},
	},
});

export default passwordListSlice.reducer;
export const {
	setSelectedPassword,
	addPassword,
	uploadPasswordData,
	editPassword,
	removePassword,
	clearPasswordsList,
} = passwordListSlice.actions;
