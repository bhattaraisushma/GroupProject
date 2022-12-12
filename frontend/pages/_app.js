import '../styles/globals.css'
import Layout from '../components/Layout'
import '../styles/signin.css'

function MyApp({ Component, pageProps }) {
  return (
  <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
