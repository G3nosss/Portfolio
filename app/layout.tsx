import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'G3nosss — Full-Stack Developer',
  description: 'Personal portfolio of G3nosss — Full-Stack Developer & Digital Craftsman',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text-primary font-sans">
        {children}
      </body>
    </html>
  )
}
