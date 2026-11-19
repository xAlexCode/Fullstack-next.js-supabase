import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <>
      <h1>404 – Page not found</h1>
      <Link href="/">Back to all puns</Link>
    </>
  )
}

export default NotFoundPage