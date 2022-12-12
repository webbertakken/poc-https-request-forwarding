import Link from 'next/link';

export default function Products() {
  return (
    <ul>
      <li>Products (local)</li>
      <li>
        <Link href="/" as="/">
          Back
        </Link>
      </li>
    </ul>
  );
}
