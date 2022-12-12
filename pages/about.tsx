import Link from 'next/link';

export default function About() {
  return (
    <ul>
      <li>About (local)</li>
      <li>
        <Link href="/" as="/">
          Back
        </Link>
      </li>
    </ul>
  );
}
