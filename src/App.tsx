import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import MainPage from './pages/main/MainPage';
import Layout from './layouts/Layout';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import AboutPage from './pages/About/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
