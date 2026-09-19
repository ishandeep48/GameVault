import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-gv-text-primary mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full px-4 py-2.5 pr-10 bg-gv-bg-secondary border rounded-gv-sm text-gv-text-primary',
              'text-sm transition-colors duration-200 appearance-none',
              'focus:border-gv-accent/50 focus:ring-1 focus:ring-gv-accent/30 outline-none',
              'disabled:bg-gv-bg-primary disabled:text-gv-text-muted disabled:cursor-not-allowed',
              error ? 'border-red-500/50' : 'border-white/[0.08]',
              className,
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gv-text-muted pointer-events-none" />
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-400" role="alert">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
