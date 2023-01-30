import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	uppercase: true,
	lowercase: false,
	numbers: true,
	symbols: false,
	atLeastOneUppercase: false,
	atLeastOneLowercase: false,
	atLeastOneNumber: false,
	atLeastOneSymbol: false,
	passLength: 8,
};

const randomConfigSlice = createSlice({
	name: 'randomConfig',
	initialState,
	reducers: {
		setRandomProperty: (state, action) => {
			if (action.payload.key && typeof action.payload.key === 'string') {
				switch (action.payload.key) {
					case 'uppercase':
						state['uppercase'] = action.payload.value;
						break;
					case 'lowercase':
						state['lowercase'] = action.payload.value;
						break;
					case 'numbers':
						state['numbers'] = action.payload.value;
						break;
					case 'symbols':
						state['symbols'] = action.payload.value;
						break;
					case 'atLeastOneUppercase':
						state['atLeastOneUppercase'] = action.payload.value;
						break;
					case 'atLeastOneLowercase':
						state['atLeastOneLowercase'] = action.payload.value;
						break;
					case 'atLeastOneNumber':
						state['atLeastOneNumber'] = action.payload.value;
						break;
					case 'atLeastOneSymbol':
						state['atLeastOneSymbol'] = action.payload.value;
						break;
					case 'passLength':
						state['passLength'] = action.payload.value;
						break;
					default:
						break;
				}
			}
		},
	},
});
export default randomConfigSlice.reducer;
export const { setRandomProperty } = randomConfigSlice.actions;
