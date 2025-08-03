import './App.css';
import { BrowserRouter } from 'react-router';
import ErrorBoundary from '@components/ErrorBoundary';
import AppRouter from './AppRouter';
import { ThemeProvider } from './providers/themeProvider';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
