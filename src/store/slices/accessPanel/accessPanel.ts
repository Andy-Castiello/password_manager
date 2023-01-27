import { createSlice } from '@reduxjs/toolkit';

type SliceType = {
	state: 'disabled' | 'edit' | 'normal' | 'accessGranted' | 'accessDenied';
	onEditCombination: boolean;
	fileName: string;
};

const initialState: SliceType = {
	state: 'disabled',
	onEditCombination: false,
	fileName: '',
};

const accessPanelSlice = createSlice({
	name: 'accessPanelSlice',
	initialState,
	reducers: {
		setAccessPanelState: (state, action) => {
			state.state = action.payload;
		},
		setFileName: (state, action) => {
			state.fileName = action.payload;
		},
		setOnEditCombination: (state, action) => {
			state.onEditCombination = action.payload;
		},
	},
});

export default accessPanelSlice.reducer;
export const { setAccessPanelState, setFileName, setOnEditCombination } =
	accessPanelSlice.actions;
