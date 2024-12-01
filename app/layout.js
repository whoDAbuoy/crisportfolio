import './globals.css'
import SectionObserver from './components/SectionObserver'
import ScrollProgress from './components/ScrollProgress'
import { LoadingBar } from './components/LoadingSpinner'
import ParallaxBackground from './components/ParallaxBackground'
import CustomCursor from './components/CustomCursor'
import FloatingMenu from './components/FloatingMenu'
import CommandPalette from './components/CommandPalette'
import { ToastProvider } from './components/Toast'

export const metadata = {
  title: 'Crispus Osano - Full Stack Developer',
  description: 'Full Stack Developer specializing in modern web applications. Expert in React, Node.js, and cloud architecture.',
  keywords: 'full stack developer, web development, react, node.js, portfolio',
  metadataBase: new URL('https://crisportfolio.vercel.app'),
  openGraph: {
    title: 'Crispus Osano - Full Stack Developer',
    description: 'Full Stack Developer specializing in modern web applications',
    type: 'website',
    locale: 'en_US',
    url: 'https://crisportfolio.vercel.app',
    siteName: 'Crispus Osano Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Crispus Osano - Full Stack Developer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crispus Osano - Full Stack Developer',
    description: 'Full Stack Developer specializing in modern web applications',
    images: ['/og-image.png']
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <ToastProvider>
          <CustomCursor />
          <ParallaxBackground />
          <ScrollProgress />
          <SectionObserver />
          <FloatingMenu />
          <CommandPalette />
          <div className="fixed top-0 left-0 right-0 z-50">
            <LoadingBar />
          </div>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
