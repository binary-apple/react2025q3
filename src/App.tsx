import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import MainPage from './pages/main/MainPage';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
