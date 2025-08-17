'use client';

import type { PropsWithChildren } from 'react';

import { ThemeProvider } from '@providers/themeProvider';
import { setupStore } from '@store/store';
import { Provider } from 'react-redux';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={setupStore()}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
