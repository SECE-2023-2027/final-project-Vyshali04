import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import AuthForm from '../components/Auth/AuthForm'

export default function Signup() {
  return (
    <>
      <Head>
        <title>Sign Up - Audiobook Chapter Tracker</title>
        <meta name="description" content="Create your account to start tracking audiobooks" />
      </Head>
      <Layout>
        <AuthForm type="signup" />
      </Layout>
    </>
  )
}