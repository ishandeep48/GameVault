import { useState } from 'react'
import { cn } from '@/utils/cn'

export interface TabProps {
  tabs: { id: string; label: string; content?: React.ReactNode }[]
  defaultActive?: string
  onChange?: (id: string) => void
  className?: string
}

/**
 * Simple tab navigation component.
 */
export function Tabs({ tabs, defaultActive, onChange, className }: TabProps) {
  const [activeId, setActiveId] = useState(defaultActive || tabs[0]?.id || '')

  const handleTabChange = (id: string) => {
    setActiveId(id)
    onChange?.(id)
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Tab list */}
      <nav
        role="tablist"
        aria-label="Tabs"
        className="flex gap-0 border-b border-white/[0.08] overflow-x-auto scrollbar-hide"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200',
                isActive
                  ? 'border-gv-accent text-gv-text-primary'
                  : 'border-transparent text-gv-text-secondary hover:text-gv-text-primary hover:border-white/[0.15]',
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </nav>

      {/* Tab panels */}
      <div className="pt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeId !== tab.id}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}
