import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accessValues from './slices/accessValues/accessValuesSlice';

export const store = configureStore({
	reducer: {
		accessValues
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
