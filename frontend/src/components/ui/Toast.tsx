import { createContext, useContext, useCallback, useState } from 'react'
import { X, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/utils/cn'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastData {
  id: string
  type: ToastType
  title?: string
  message: string
  duration?: number // ms, default 4000
}

interface ToastContextValue {
  toast: (data: Omit<ToastData, 'id'>) => void
  success: (message: string, title?: string) => void
  error: (message: string, title?: string) => void
  warning: (message: string, title?: string) => void
  info: (message: string, title?: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within a ToastProvider')
  return context
}

/**
 * Single toast notification component.
 */
function ToastItem({ data, onDismiss }: { data: ToastData; onDismiss: (id: string) => void }) {
  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle2 className="w-5 h-5 text-status-playing shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-status-on-hold shrink-0" />,
    info: <Info className="w-5 h-5 text-gv-accent shrink-0" />,
  }

  const borderColors: Record<ToastType, string> = {
    success: 'border-l-status-playing',
    error: 'border-l-red-500',
    warning: 'border-l-status-on-hold',
    info: 'border-l-gv-accent',
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-gv-md bg-gv-bg-secondary border border-white/[0.08] border-l-4 shadow-lg',
        borderColors[data.type],
      )}
      role="alert"
    >
      {icons[data.type]}
      <div className="flex-1 min-w-0">
        {data.title && (
          <p className="text-sm font-medium text-gv-text-primary">{data.title}</p>
        )}
        <p className={cn('text-sm', data.title ? 'mt-0.5' : '')}>
          {data.message}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(data.id)}
        className="p-1 rounded-md text-gv-text-muted hover:text-gv-text-primary hover:bg-white/[0.08] transition-colors shrink-0"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  )
}

/**
 * Toast provider that manages a queue of notifications.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback((data: Omit<ToastData, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    const toast: ToastData = { ...data, id }
    setToasts((prev) => [...prev, toast])

    // Auto-dismiss after duration
    if (data.duration !== 0) {
      setTimeout(() => removeToast(id), data.duration ?? 4000)
    }
  }, [removeToast])

  const success = useCallback(
    (message: string, title?: string) => addToast({ type: 'success', message, title }),
    [addToast]
  )
  const error = useCallback(
    (message: string, title?: string) => addToast({ type: 'error', message, title }),
    [addToast]
  )
  const warning = useCallback(
    (message: string, title?: string) => addToast({ type: 'warning', message, title }),
    [addToast]
  )
  const info = useCallback(
    (message: string, title?: string) => addToast({ type: 'info', message, title }),
    [addToast]
  )

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, warning, info }}>
      {children}
      {/* Toast container — fixed bottom-right */}
      <div
        className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem data={toast} onDismiss={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
