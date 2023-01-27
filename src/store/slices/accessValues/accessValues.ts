import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	bars: [0, 0, 0, 0, 0],
	lock: [null, null, null],
	password: '',
	confirmPassword: '',
};

const accessValuesSlice = createSlice({
	name: 'accessValues',
	initialState,
	reducers: {
		setBarValue: (state, action) => {
			state.bars[action.payload.barId] = action.payload.value;
		},
		setLockValue: (state, action) => {
			state.lock[action.payload.key] = action.payload.value;
		},
		resetLock: (state) => {
			state.lock = [null, null, null];
		},
		resetAll: (state) => {
			state.bars = initialState.bars;
			state.lock = initialState.lock;
			state.password = initialState.password;
			state.confirmPassword = initialState.confirmPassword;
		},
		setPassword: (state, action) => {
			state.password = action.payload;
		},
		setConfirmPassword: (state, action) => {
			state.confirmPassword = action.payload;
		},
	},
});

export default accessValuesSlice.reducer;
export const {
	setBarValue,
	setLockValue,
	resetLock,
	setPassword,
	setConfirmPassword,
	resetAll,
} = accessValuesSlice.actions;
