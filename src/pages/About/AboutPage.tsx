function AboutPage() {
  return (
    <div className="flex flex-col gap-5 max-w-[320px] text-lg">
      <div>
        Hi, my name is Anna and I am currently learning magic of React in
        RSSchool (Hogwarts in programming world). <br />
        Take a look into my code spellbook:{' '}
        <a
          href="https://github.com/binary-apple"
          target="blank"
          className="underline"
        >
          github
        </a>
        .
      </div>
      <div>
        If you also want to become a frontend-wizard, don&apos;t wait for an
        owl, just visit the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="blank"
          className="underline"
        >
          website
        </a>
      </div>
    </div>
  );
}

export default AboutPage;
