import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '../../public/admin-theme/assets/css/dashlite.css'
import '../../public/admin-theme/assets/css/theme.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
