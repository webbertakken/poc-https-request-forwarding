import Link from 'next/link';

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/about" as="/about">
          About
        </Link>{' '}
        (local)
      </li>
      <li>
        <a href="/products/">Products</a> (forwarding).
      </li>
    </ul>
  );
}
