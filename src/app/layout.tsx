// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContexts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { 
    template: "%s - consultaFacil",
    default: 'consultaFacil'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Adicionado suppressHydrationWarning no <html> para ignorar atributos de extensões
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      {/* Adicionado suppressHydrationWarning no <body> para silenciar o erro específico 
          mostrado no seu log relacionado ao cz-shortcut-listen
      */}
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider> 
          {children} 
        </AuthProvider>
      </body>
    </html>
  );
}