import DetailsView from '@components/DetailsView';
import AboutPage from '@pages/About';
import MainPage from '@pages/main';
import NotFoundPage from '@pages/NotFound';
import { Routes, Route } from 'react-router';

import Layout from './layouts/Layout';

function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />}>
          <Route index element={<DetailsView />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
