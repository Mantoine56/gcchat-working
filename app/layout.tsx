import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'myGC assistant',
  description: 'AI chat interface following the Government of Canada Design System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white font-gc">{children}</body>
    </html>
  )
}
