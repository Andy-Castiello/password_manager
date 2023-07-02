import { createSlice } from "@reduxjs/toolkit";

export type accessValuesType = {
  bars: number[];
  lock: Array<number | null>;
  password: string;
  confirmPassword: string;
};

const initialState: accessValuesType = {
  bars: [0, 0, 0, 0, 0],
  lock: [null, null, null],
  password: "",
  confirmPassword: "",
};

const accessValuesSlice = createSlice({
  name: "accessValues",
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
    resetAccessValues: (state) => {
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
  resetAccessValues,
} = accessValuesSlice.actions;
