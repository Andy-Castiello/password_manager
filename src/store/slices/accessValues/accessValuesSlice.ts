import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	bars: [0, 0, 0, 0, 0],
	lock: [null, null, null],
	password: '',
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
	},
});

export default accessValuesSlice.reducer;
export const { setBarValue, setLockValue, resetLock } = accessValuesSlice.actions;
