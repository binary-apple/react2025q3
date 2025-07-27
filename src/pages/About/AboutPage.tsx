import classes from './AboutPage.module.css';

function AboutPage() {
  return (
    <div className={classes.wrapper}>
      <div>
        Hi, my name is Anna and I am currently learning magic of React in
        RSSchool (Hogwarts in programming world). <br />
        Take a look into my code spellbook:{' '}
        <a href="https://github.com/binary-apple" target="blank">
          github
        </a>
        .
      </div>
      <div className={classes['school-info']}>
        <div>
          If you also want to become a frontend-wizard, don&apos;t wait for an
          owl, just visit the{' '}
          <a href="https://rs.school/courses/reactjs" target="blank">
            website
          </a>
        </div>
        <div>
          <a href="https://rs.school/courses/reactjs" target="blank">
            <img
              className={classes.logo}
              src="https://rs.school/_next/static/media/rss-logo.c19ce1b4.svg"
              alt="Course logo"
            ></img>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
