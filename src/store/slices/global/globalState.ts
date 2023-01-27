import { createSlice } from '@reduxjs/toolkit';

type SliceType = {
	fileType: 'none' | 'existent' | 'new';
	panel: 'access' | 'manager';
	fileData: string | object | null;
};
const initialState: SliceType = {
	fileType: 'none',
	panel: 'access',
	fileData: null,
};

const globalState = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setFileType: (state, action) => {
			state.fileType = action.payload;
		},
		setPanel: (state, action) => {
			state.panel = action.payload;
		},
		setFileData: (state, action) => {
			state.fileData = action.payload;
		},
	},
});

export default globalState.reducer;

export const { setFileType, setPanel, setFileData } = globalState.actions;
