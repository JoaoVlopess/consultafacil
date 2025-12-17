
import { AuthBrandingPanel } from '@/src/components/auth/AuthBrandingPanel'
import { LoginPageClient } from './loginpageclient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login'
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <AuthBrandingPanel variant="login" />
      <div className="flex-1 flex items-center justify-center p-8">
        <LoginPageClient />
      </div>
    </div>
  )
}