import MainPage from '@components/main-page';

function App() {
  return (
    <>
      <header className="flex justify-between max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold py-2">React performance</h1>
        <h2 className="text-5xl font-bold py-2">CO2 Emissions</h2>
      </header>
      <MainPage />
    </>
  );
}

export default App;
