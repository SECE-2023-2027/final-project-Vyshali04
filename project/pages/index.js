import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import Hero from '../components/Home/Hero'
import Features from '../components/Home/Features'
import CTA from '../components/Home/CTA'

export default function Home() {
  return (
    <>
      <Head>
        <title>Audiobook Chapter Tracker</title>
        <meta name="description" content="Track your audiobook progress chapter by chapter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Hero />
        <Features />
        <CTA />
      </Layout>
    </>
  )
}