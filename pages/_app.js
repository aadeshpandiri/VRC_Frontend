import '../styles/globals.css';
import Head from "next/head";
import { Box, Container } from "@mui/material";

import SharedState from '../context/sharedState'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
// import { ToastContainer, toast } from 'react-toast'
import toast, { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>VRC Application</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        {/* <Header /> */}
        <Container
          maxWidth="auto"
          style={{
            paddingLeft: '0px',
            paddingRight: '0px'
          }}
          className="app-container"
        >
          <Box>
            {/* <ToastContainer /> */}
            <Toaster />
            <SharedState>
              <Component {...pageProps} />
            </SharedState>
          </Box>
        </Container>
      </ThemeProvider>
    </>

  )
}

export default MyApp
