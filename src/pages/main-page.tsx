import Button from '@/components/Button';

function MainPage() {
  return (
    <div className="flex flex-col gap-3">
      <header>
        <h1 className="my-3 text-2xl font-bold">Forms</h1>
        <div className="flex gap-3">
          <Button>Controlled form</Button>
          <Button>Uncontrolled form</Button>
        </div>
      </header>
      <main></main>
    </div>
  );
}

export default MainPage;
