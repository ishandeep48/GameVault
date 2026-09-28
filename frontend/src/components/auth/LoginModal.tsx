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
  const [username, setUsername] = useState('')
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

    const validationError = validateLogin({ username, password })
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    try {
      const result = await authenticate({ username, password })
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
        <Input label="Username" type="text" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" placeholder="Enter your username" required />
        <PasswordInput label="Password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" helperText="At least 8 characters" required />
        <Button type="submit" className="w-full" isLoading={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
        <button type="button" onClick={() => { handleClose(); navigate('/signup', { state: { from: loginModalFrom } }) }} className="w-full text-sm font-medium text-gv-accent hover:underline">
          Create an account
        </button>
      </form>
    </Modal>
  )
}
