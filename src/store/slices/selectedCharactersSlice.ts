import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type SelectedCharactersState = {
  value: number[];
};

const initialState: SelectedCharactersState = {
  value: [],
};

export const selectedCharactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      state.value = [...state.value, action.payload];
    },
    remove: (state, action: PayloadAction<number>) => {
      const index = state.value.findIndex((val) => val === action.payload);
      if (index >= 0) {
        state.value.splice(index, 1);
      }
    },
    removeAll: (state) => {
      state.value = [];
    },
  },
});

export const { add, remove, removeAll } = selectedCharactersSlice.actions;
export default selectedCharactersSlice.reducer;
