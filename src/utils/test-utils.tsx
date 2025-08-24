import type { PropsWithChildren, ReactElement } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import formReducer from '@/store/form-slice';
import type { RootState } from '@/store/store';

export function setupStore(preloadedState?: RootState) {
  return configureStore({
    reducer: { form: formReducer },
    preloadedState,
  });
}

export type AppTestStore = ReturnType<typeof setupStore>;

export interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: RootState;
  store?: AppTestStore;
}

export function renderWithStore(
  ui: ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
