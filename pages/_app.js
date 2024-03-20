import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../src/theme'
import MainLayout from '../src/layout'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function MyApp(props) {
  const { Component, pageProps } = props
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </QueryClientProvider>
      </ThemeProvider>
    </AppCacheProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
