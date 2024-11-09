import { Inter } from 'next/font/google'
import './globals.css'
import { getAuthSession } from '@/lib/auth'
import Navbar from './components/navbar'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children }) {
  const session = await getAuthSession()
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}