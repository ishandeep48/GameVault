import { forwardRef, useState } from 'react'
import { cn } from '@/utils/cn'
import { Eye, EyeOff } from 'lucide-react'

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gv-text-primary mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id={inputId}
            ref={ref}
            className={cn(
              'w-full px-4 py-2.5 pr-10 bg-gv-bg-secondary border rounded-gv-sm text-gv-text-primary placeholder-gv-text-muted',
              'text-sm transition-colors duration-200',
              'focus:border-gv-accent/50 focus:ring-1 focus:ring-gv-accent/30 outline-none',
              'disabled:bg-gv-bg-primary disabled:text-gv-text-muted disabled:cursor-not-allowed',
              error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30' : 'border-white/[0.08]',
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gv-text-muted hover:text-gv-text-secondary transition-colors p-0.5"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-xs text-gv-text-muted">{helperText}</p>
        )}
      </div>
    )
  },
)

PasswordInput.displayName = 'PasswordInput'
