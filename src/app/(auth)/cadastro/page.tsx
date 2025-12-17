import { AuthBrandingPanel } from "@/src/components/auth/AuthBrandingPanel"
import { CadastroPageClient } from "../cadastro/cadastropageclient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Cadastro'
}

const Page = () => {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <CadastroPageClient />
      </div>
      <AuthBrandingPanel variant="signup" />
    </div>
  )
}

export default Page;