import { NavLink } from 'react-router';

function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <h2>This page magically disappeared</h2>
      <NavLink to="/">Accio Homepage!</NavLink>
    </div>
  );
}

export default NotFoundPage;
