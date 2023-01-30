import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accessValues from './slices/accessValues/accessValues';
import accessPanel from './slices/accessPanel/accessPanel';
import globalState from './slices/global/globalState';
import passwordListSlice from './slices/passwordListSlice/passwordListSlice';
import passwordEditorSlice from './slices/passwordEditorSlice/passwordEditorSlice';
import randomConfigSlice from './slices/randomConfigSlice/randomConfigSlice';

export const store = configureStore({
	reducer: {
		accessValues,
		accessPanel,
		globalState,
		passwordListSlice,
		passwordEditorSlice,
		randomConfigSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
