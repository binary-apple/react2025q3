import './App.css';
import { BrowserRouter } from 'react-router';
import ErrorBoundary from '@components/ErrorBoundary';
import AppRouter from './AppRouter';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
