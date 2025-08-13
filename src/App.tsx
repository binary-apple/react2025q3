import './App.css';
import ErrorBoundary from '@components/ErrorBoundary';
import { ThemeProvider } from '@providers/themeProvider';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import AppRouter from './AppRouter';
import { setupStore } from './store/store';

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <ThemeProvider>
            <AppRouter />
          </ThemeProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
