function Loader() {
  return (
    <div
      className="m-auto h-[50px] w-[50px] border-5 border-transparent dark:border-t-foreground border-t-foreground-dark animate-spin rounded-full"
      data-testid="loader"
    ></div>
  );
}

export default Loader;
