import '../index.css';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <h2>This page magically disappeared</h2>
      <Link href="/" className="underline">
        Accio Homepage!
      </Link>
    </div>
  );
}
