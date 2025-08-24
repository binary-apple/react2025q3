import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { store } from '@/store/store.ts';
import { Provider } from 'react-redux';

const root = document.getElementById('root');

if (!root) {
  throw new Error('#root element not found');
}

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
