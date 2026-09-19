import { useState } from 'react'
import { CheckCircle2, Circle, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface MissionRowProps {
  id: string
  title: string
  order?: number
  completed?: boolean
  isCurrent?: boolean
  collapsed?: boolean // for act grouping
  onToggleComplete?: (id: string, completed: boolean) => void
  onClick?: () => void
  className?: string
}

/**
 * Reusable mission row component.
 * Does NOT enforce sequential completion — each mission is independent.
 */
export function MissionRow({
  id,
  title,
  order,
  completed = false,
  isCurrent = false,
  collapsed,
  onToggleComplete,
  onClick,
  className,
}: MissionRowProps) {
  const [isExpanded, setIsExpanded] = useState(!collapsed)

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onToggleComplete) {
      onToggleComplete(id, !completed)
    }
  }

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded((prev) => !prev)
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-gv-sm transition-colors duration-150',
        isCurrent && 'bg-gv-accent/5 border border-gv-accent/15',
        !isCurrent && 'hover:bg-white/[0.03]',
        className,
      )}
    >
      {/* Expand/collapse toggle (for acts) */}
      {collapsed !== undefined && (
        <button
          type="button"
          onClick={handleExpand}
          className="p-1 rounded-md text-gv-text-muted hover:text-gv-text-primary transition-colors shrink-0"
          aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
        >
          {isExpanded ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>
      )}

      {/* Completion checkbox */}
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          'shrink-0 transition-colors duration-200',
          completed ? 'text-status-playing' : 'text-gv-text-muted hover:text-gv-text-secondary',
        )}
        aria-label={`Mark "${title}" as ${completed ? 'incomplete' : 'complete'}`}
      >
        {completed ? (
          <CheckCircle2 size={20} />
        ) : (
          <Circle size={20} />
        )}
      </button>

      {/* Mission info */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-sm transition-colors',
            completed ? 'text-gv-text-muted line-through' : isCurrent ? 'text-gv-text-primary font-medium' : 'text-gv-text-secondary',
          )}
        >
          {title}
        </p>
      </div>

      {/* Order number */}
      {order !== undefined && (
        <span className="shrink-0 text-xs font-mono text-gv-text-muted">#{order}</span>
      )}

      {/* Click handler for navigation */}
      {onClick && (
        <button
          type="button"
          onClick={onClick}
          className="p-1.5 rounded-md text-gv-text-muted hover:text-gv-text-primary transition-colors shrink-0 opacity-0 group-hover:opacity-100"
          aria-label={`View details for ${title}`}
        >
          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  )
}
