import type { Config } from 'tailwindcss'

// A lista de cores do shadcn/ui será incorporada diretamente.
// As cores 'primary', 'secondary', etc. usam HSL/variáveis.
const config: Config = {

 darkMode: "class",

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}', // Importante para as suas features
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // ============================================
        // CORES DO SHADCN/UI (Mapeadas para variáveis HSL no globals.css)
        // Isso permite que os componentes Button, Card, etc., funcionem.
        // ============================================
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // ============================================
        // SUAS CORES PERSONALIZADAS (HEX/RGB)
        // ============================================

        // CORES PRINCIPAIS DO BRAND (Usaremos 'brandPrimary' e 'brandSecondary' para evitar conflito)
        brandPrimary: { 
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Azul principal (base)
          600: '#2563eb', // Azul forte (hover/active)
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        brandSecondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7', // Roxo principal
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        brandAccent: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // Índigo principal
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },

        // CORES DE STATUS
        status: {
          ongoing: {
            light: '#dbeafe',
            DEFAULT: '#3b82f6',
            dark: '#1e40af',
          },
          archived: {
            light: '#f1f5f9',
            DEFAULT: '#64748b',
            dark: '#334155',
          },
          won: {
            light: '#dcfce7',
            DEFAULT: '#22c55e',
            dark: '#15803d',
          },
          lost: {
            light: '#fee2e2',
            DEFAULT: '#ef4444',
            dark: '#b91c1c',
          },
        },

        // CORES FUNCIONAIS
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },

        // CORES NEUTRAS
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },

        // CORES DE BACKGROUNDS E BORDERS
        appBackground: { // Renomeado para evitar conflito com 'background' do shadcn/ui
          primary: '#ffffff',
          secondary: '#f8fafc',
          tertiary: '#f1f5f9',
          dark: '#0f172a',
          gradient: {
            from: '#eff6ff',
            via: '#dbeafe',
            to: '#e0e7ff',
          },
        },
        appBorder: { // Renomeado para evitar conflito com 'border' do shadcn/ui
          light: '#e2e8f0',
          DEFAULT: '#cbd5e1',
          dark: '#94a3b8',
          focus: '#3b82f6',
        },
        overlay: {
          light: 'rgba(15, 23, 42, 0.05)',
          DEFAULT: 'rgba(15, 23, 42, 0.1)',
          dark: 'rgba(15, 23, 42, 0.3)',
          heavy: 'rgba(15, 23, 42, 0.6)',
        },
      },

      // O restante das suas configurações de tema
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #a855f7 100%)',
        'gradient-primary-hover': 'linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #9333ea 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #e0e7ff 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        'gradient-success': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'gradient-error': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(15, 23, 42, 0.08)',
        'card': '0 4px 12px rgba(15, 23, 42, 0.1)',
        'card-hover': '0 8px 24px rgba(15, 23, 42, 0.15)',
        'primary': '0 4px 16px rgba(59, 130, 246, 0.3)',
        'primary-hover': '0 8px 24px rgba(59, 130, 246, 0.4)',
        'success': '0 4px 16px rgba(34, 197, 94, 0.3)',
        'warning': '0 4px 16px rgba(245, 158, 11, 0.3)',
        'error': '0 4px 16px rgba(239, 68, 68, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  // Certifique-se de que o plugin de animação do shadcn/ui está aqui
  plugins: [require("tailwindcss-animate")],
}

export default config