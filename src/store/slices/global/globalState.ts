import { createSlice } from '@reduxjs/toolkit';

type SliceType = {
	panel: 'access' | 'manager';
	fileData: string | object | null;
};
const initialState: SliceType = {
	panel: 'access',
	fileData: null,
};

const globalState = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setPanel: (state, action) => {
			state.panel = action.payload;
		},
		setFileData: (state, action) => {
			state.fileData = action.payload;
		},
	},
});

export default globalState.reducer;

export const { setPanel, setFileData } = globalState.actions;
