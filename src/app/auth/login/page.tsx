'use client'

import { useState } from 'react'
import { AuthBrandingPanel } from '@/src/components/auth/AuthBrandingPanel'
import { LoginForm } from '@/src/components/auth/LoginForm'

export default function LoginPage() {
  const [userType, setUserType] = useState<'cliente' | 'advogado'>('cliente')

  return (
    <div className="min-h-screen flex">
      <AuthBrandingPanel variant="login" />
      <div className="flex-1 flex items-center justify-center p-8">
        <LoginForm userType={userType} onUserTypeChange={setUserType} />
      </div>
    </div>
  )
}