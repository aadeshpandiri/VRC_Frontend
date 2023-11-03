import '../styles/globals.css';
import Head from "next/head";
import SharedState from '../context/sharedState'
function MyApp({ Component, pageProps }) {
  return (
    <>
     <Head>
      <title>VRC Application</title>
          <link rel="icon" href="/favicon.ico" />
       </Head>
       <SharedState>
     <Component {...pageProps} />
  </SharedState>
       </>

 )
}

export default MyApp
