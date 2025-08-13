import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { potterApi } from '@services/potterApi';

import selectedCharactersReducer from './slices/selectedCharactersSlice';

const rootReducer = combineReducers({
  selectedCharacters: selectedCharactersReducer,
  [potterApi.reducerPath]: potterApi.reducer,
});
export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(potterApi.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
