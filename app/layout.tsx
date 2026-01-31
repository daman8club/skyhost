import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '../components/ClientLayout'

export const metadata: Metadata = {
  title: 'Skyhost Digital - Futuristic Web Agency NYC',
  description: 'Websites that load before you blink. Premium web development for New York businesses.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}