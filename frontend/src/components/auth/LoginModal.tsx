import { useCallback, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { useAuth } from '@/hooks/useAuth'
import { validateLogin } from '@/services/authService'

export function LoginModal() {
  const navigate = useNavigate()
  const { authenticate, loginModalOpen, loginModalFrom, closeLoginModal } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)

  const handleClose = useCallback(() => {
    setError(undefined)
    closeLoginModal()
  }, [closeLoginModal])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(undefined)

    if (validateLogin({ email, password })) {
      setError('Enter a valid email address and password.')
      return
    }

    setLoading(true)
    try {
      const result = await authenticate({ email, password })
      if (result.error) {
        setError(result.error)
        return
      }
      handleClose()
      navigate(loginModalFrom ?? '/home')
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={loginModalOpen} onClose={handleClose} title="Sign in to GameVault" description="Access your library and join the conversation.">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="rounded-gv-sm border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400" role="alert">{error}</p>}
        <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" helperText="Demo: demo@gamevault.local" required />
        <PasswordInput label="Password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" helperText="Demo: GameVault@123" required />
        <Button type="submit" className="w-full" isLoading={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
        <button type="button" onClick={() => { handleClose(); navigate('/signup', { state: { from: loginModalFrom } }) }} className="w-full text-sm font-medium text-gv-accent hover:underline">
          Create an account
        </button>
      </form>
    </Modal>
  )
}
