import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.tsx';
import { setupStore } from './store/store.ts';

const root = document.getElementById('root');

if (!root) {
  throw new Error('#root element not found');
}

createRoot(root).render(
  <Provider store={setupStore()}>
    <App />
  </Provider>
);
