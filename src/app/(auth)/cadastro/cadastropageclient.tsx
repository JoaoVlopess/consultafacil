'use client'

import { useState } from 'react'
import { LoginForm } from '@/src/components/auth/LoginForm'
import { SignInForm } from '@/src/components/auth/SingInForm'

export function CadastroPageClient() {
  const [userType, setUserType] = useState<'cliente' | 'advogado'>('cliente')

  return (
    <SignInForm userType={userType} onUserTypeChange={setUserType} />
  )
}