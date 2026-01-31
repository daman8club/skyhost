import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Admin Panel - Skyhost Digital',
  description: 'Admin panel for managing Skyhost Digital website and customer interactions.',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}