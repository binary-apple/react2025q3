import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import MainPage from './pages/main/MainPage';

function App() {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
}

export default App;
