import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'myGC assistant',
  description: 'Government of Canada AI assistant providing help with government services and information',
  keywords: 'Canada, government, assistant, services, information, help',
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
      <body className="bg-white font-gc">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:z-50 focus:bg-white focus:text-gc-blue">
          Skip to main content
        </a>
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
