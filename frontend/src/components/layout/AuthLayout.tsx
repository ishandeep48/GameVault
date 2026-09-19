import { Link } from 'react-router-dom'
import { Gamepad2 } from 'lucide-react'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  footerText: string
  footerLink: string
  footerHref: string
}

/**
 * Shared layout for Login and Signup pages.
 * Centered card with branding, works on all screen sizes.
 */
export function AuthLayout({ children, title, subtitle, footerText, footerLink, footerHref }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gv-bg-primary px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        {/* Branding */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <Gamepad2 size={28} className="text-gv-accent" />
            <span className="text-xl font-bold text-gv-text-primary tracking-tight">GameVault</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gv-text-primary">{title}</h1>
          <p className="text-gv-text-secondary text-sm md:text-base">{subtitle}</p>
        </div>

        {/* Form Card */}
        <div className="card bg-gv-bg-secondary border border-white/[0.06]">
          {children}
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-gv-text-secondary">
          {footerText}{''}
          <Link to={footerHref} className="text-gv-accent hover:underline font-medium">
            {footerLink}
          </Link>
        </p>
      </div>
    </div>
  )
}
