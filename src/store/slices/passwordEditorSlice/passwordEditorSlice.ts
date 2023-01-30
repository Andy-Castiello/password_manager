import { createSlice } from '@reduxjs/toolkit';

type SliceType = {
	state: 'new' | 'edit' | null;
	values: {
		name: string;
		previousPassword: string;
		password: string;
		newPassword: string;
		lastUpdate: string;
	};
};

const initialState: SliceType = {
	state: null,
	values: {
		name: '',
		previousPassword: '',
		password: '',
		newPassword: '',
		lastUpdate: '',
	},
};

const passwordEditorSlice = createSlice({
	name: 'passwordEditor',
	initialState,
	reducers: {
		setPasswordEditorState: (state, action) => {
			state.state = action.payload;
		},
		resetPasswordEditorValues: (state) => {
			state.values = initialState.values;
		},
		changePasswordEditorValue: (state, action) => {
			if (action.payload.key && typeof action.payload.key === 'string') {
				switch (action.payload.key) {
					case 'name':
						state.values['name'] = action.payload.value;
						break;
					case 'previousPassword':
						state.values['previousPassword'] = action.payload.value;
						break;
					case 'password':
						state.values['password'] = action.payload.value;
						break;
					case 'newPassword':
						state.values['newPassword'] = action.payload.value;
						break;
					case 'lastUpdate':
						state.values['lastUpdate'] = action.payload.value;
						break;
					default:
						break;
				}
			}
		},
		setAllEditorValues: (state, action) => {
			state.values = {
				name: action.payload.name,
				previousPassword: action.payload.previousPassword,
				password: action.payload.password,
				newPassword: '',
				lastUpdate: action.payload.lastUpdate,
			};
		},
	},
});

export default passwordEditorSlice.reducer;
export const {
	setPasswordEditorState,
	resetPasswordEditorValues,
	changePasswordEditorValue,
	setAllEditorValues,
} = passwordEditorSlice.actions;
