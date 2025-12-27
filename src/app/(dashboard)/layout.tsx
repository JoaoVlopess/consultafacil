import { Header } from '@/src/components/layout/header'
import { Footer } from '@/src/components/layout/footer'
import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      
      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
    
  )
}