import { AuthProvider } from '@/src/contexts/AuthContexts'
import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AuthProvider>
          {children}
      </AuthProvider>
    </div>
  )
}