import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard'
}

const Page = () => {
  return (
    <div className="min-h-screen flex">
        olá
    </div>
  )
}

export default Page;