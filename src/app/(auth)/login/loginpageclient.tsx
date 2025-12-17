'use client'

import { useState } from 'react'
import { LoginForm } from '@/src/components/auth/LoginForm'

export function LoginPageClient() {
  const [userType, setUserType] = useState<'cliente' | 'advogado'>('cliente')

  return (
    <LoginForm userType={userType} onUserTypeChange={setUserType} />
  )
}