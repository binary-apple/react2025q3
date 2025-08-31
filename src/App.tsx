import MainPage from '@components/main-page';
import { Suspense } from 'react';
import Loader from './components/loader';

function App() {
  return (
    <>
      <header className="flex justify-between max-w-5xl mx-auto my-3">
        <h1 className="text-5xl font-bold py-2">React performance</h1>
        <h2 className="text-5xl font-bold py-2">CO2 Emissions</h2>
      </header>
      <Suspense fallback={<Loader />}>
        <MainPage />
      </Suspense>
    </>
  );
}

export default App;
