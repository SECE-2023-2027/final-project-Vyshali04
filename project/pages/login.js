import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import AuthForm from '../components/Auth/AuthForm'

export default function Login() {
  return (
    <>
      <Head>
        <title>Login - Audiobook Chapter Tracker</title>
        <meta name="description" content="Login to your audiobook tracker account" />
      </Head>
      <Layout>
        <AuthForm type="login" />
      </Layout>
    </>
  )
}