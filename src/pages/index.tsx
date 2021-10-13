import type { NextPage } from 'next'
import Head from 'next/head';
import { Header } from 'components/Header';
import { Home } from 'components/Home';

const HomeNext: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | rem!nd me</title>
      </Head>

      <Header />
      <Home />
    </>
  )
}

export default HomeNext
