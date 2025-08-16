import DetailsView from '@components/DetailsView';
import MainPage from '@pages/main';
import { Routes, Route } from 'react-router';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<DetailsView />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
