import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accessValues from './slices/accessValues/accessValues';
import accessPanel from './slices/accessPanel/accessPanel';
import globalState from './slices/global/globalState';

export const store = configureStore({
	reducer: {
		accessValues,
		accessPanel,
		globalState
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
