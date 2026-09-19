import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gv-text-primary mb-1.5">
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 bg-gv-bg-secondary border rounded-gv-sm text-gv-text-primary placeholder-gv-text-muted',
            'text-sm transition-colors duration-200',
            'focus:border-gv-accent/50 focus:ring-1 focus:ring-gv-accent/30 outline-none',
            'disabled:bg-gv-bg-primary disabled:text-gv-text-muted disabled:cursor-not-allowed',
            error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30' : 'border-white/[0.08]',
            className,
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-400" role="alert">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-xs text-gv-text-muted">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
