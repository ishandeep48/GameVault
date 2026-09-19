import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/utils/cn'

export interface TooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number // ms before showing
}

const positionClasses: Record<NonNullable<TooltipProps['position']>, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

/**
 * Lightweight tooltip for icon-only controls.
 * Supplementary only — never contains essential information.
 */
export function Tooltip({ content, children, position = 'top', delay = 200 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const showTooltip = useCallback(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setIsVisible(true), delay)
  }, [delay])

  const hideTooltip = useCallback(() => {
    clearTimeout(timerRef.current)
    setIsVisible(false)
  }, [])

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  // Hide on touch devices after a brief delay to prevent flicker
  const handleTouchStart = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onTouchStart={handleTouchStart}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 px-2.5 py-1.5 text-xs font-medium text-gv-text-primary bg-gv-bg-tertiary border border-white/[0.1] rounded-gv-sm shadow-lg whitespace-nowrap',
            positionClasses[position],
          )}
          role="tooltip"
        >
          {content}
          {/* Arrow */}
          <div
            className={cn(
              'absolute w-2 h-2 bg-gv-bg-tertiary border-r border-b border-white/[0.1] rotate-45',
              position === 'top' && 'top-full left-1/2 -translate-x-1/2 -mt-1',
              position === 'bottom' && 'bottom-full left-1/2 -translate-x-1/2 -mb-1 mt-[1px]',
              position === 'left' && 'left-full top-1/2 -translate-y-1/2 -ml-1',
              position === 'right' && 'right-full top-1/2 -translate-y-1/2 -mr-1',
            )}
          />
        </div>
      )}
    </div>
  )
}
