import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// Styles
import './globals.css'

// Components
import Sidebar from '@/components/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Entreprise Platform',
  description: 'Platform for entreprises'
}

export default function RootLayout ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex justify-center'>
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  )
}
