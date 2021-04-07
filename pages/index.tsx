import Link from 'next/link'
import CompleteVocabs from '../components/CompleteVocabs'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <CompleteVocabs></CompleteVocabs>
  </Layout>
)

export default IndexPage
