// Import global styles and fonts
import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowBigLeftIcon } from 'lucide-react'
 
const inter = Inter({ subsets: ['latin'] })
 
export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}
 
export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className='flex w-fit flex-col justify-start items-center'>
          <h1>Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
        <Link className='flex flex-row' href="/">Return Home <ArrowBigLeftIcon/> </Link>
      </body>
    </html>
  )
}