import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { StatsProvider } from './providers/stats-provider';
// import { StrictMode } from 'react';

const root = document.getElementById('root');

if (!root) {
  throw new Error('#root element not found');
}

createRoot(root).render(
  // <StrictMode>
  <StatsProvider>
    <App />
  </StatsProvider>
  // </StrictMode>
);
