import Link from 'next/link'

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/a" as="/a">
          a (local)
        </Link>
      </li>
      <li>
        <Link href="/b" as="/b">
          b (forward)
        </Link>
      </li>
    </ul>
  )
}
