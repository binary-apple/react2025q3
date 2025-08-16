import DetailsView from '@components/DetailsView';
import MainPage from '@pages/main';
import NotFoundPage from '@pages/NotFound';
import { Routes, Route } from 'react-router';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<DetailsView />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
